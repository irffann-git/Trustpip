"use client";

/**
 * TradingBackground
 * Animated, minimal, dark trading background for a section.
 *
 * Requirements on the parent section:
 *   className="relative isolate overflow-hidden"
 * (`isolate` lets this layer sit at z-index -10 behind your content
 *  without disappearing behind the page background.)
 */

import { Component, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Tunables                                                                  */
/* -------------------------------------------------------------------------- */

const BG_HEX = "#080808";
const GREEN_HEX = "#97bf1f";
const RED_HEX = "#d4484f";

const SCROLL_SPEED = 0.45; // candles per second (chart scroll speed)
const OPACITY = 0.6; // global candle opacity multiplier
const STATIC_TIME = 7; // frozen time used when prefers-reduced-motion is on

// Ambient green haze. 0 = none. (was ~0.17 green before)
const AMBIENT_GLOW = [0.01, 0.026, 0.018];

const TIERS = {
  desktop: { perSide: 40, zone: 0.3, amp: 0.3, particles: 40, intensity: 3 },
  tablet: { perSide: 14, zone: 0.27, amp: 0.27, particles: 26, intensity: 0.9 },
  mobile: { perSide: 8, zone: 0.34, amp: 0.2, particles: 14, intensity: 0.65 },
};

const LINE_SEGMENTS = 140;
const LINE_DEFS = [
  { y: 0.2, a1: 0.07, f1: 1.1, s1: 0.22, p1: 0.4, a2: 0.02, f2: 3.1, s2: 0.31, p2: 1.7, trend: 0.1, color: "#33463e", gain: 0.5 },
  { y: -0.05, a1: 0.06, f1: 0.8, s1: 0.17, p1: 2.2, a2: 0.025, f2: 2.6, s2: 0.26, p2: 0.6, trend: -0.08, color: "#2b3b35", gain: 0.45 },
  { y: -0.28, a1: 0.08, f1: 1.5, s1: 0.2, p1: 4.1, a2: 0.02, f2: 2.2, s2: 0.34, p2: 3.0, trend: 0.14, color: "#232f2b", gain: 0.4 },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const TAU = Math.PI * 2;

// sRGB hex -> [r, g, b] in 0..1 (written straight to the screen by our shaders)
const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
const BG = hexToRgb(BG_HEX);
const GREEN = hexToRgb(GREEN_HEX);
const RED = hexToRgb(RED_HEX);

// smooth 0 -> 1 ramp over [0, e]
const ramp = (v, e) => {
  const k = Math.min(Math.max(v / e, 0), 1);
  return k * k * (3 - 2 * k);
};

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ~N(0,1)
const gauss = (rnd) => (rnd() + rnd() + rnd() + rnd() - 2) * 1.732;

/* -------------------------------------------------------------------------- */
/*  Candle data: looping OHLC "market" (no allocations per frame)             */
/*  - every candle opens at the previous close (no gaps)                      */
/*  - volatility clusters (quiet stretches, then big moves)                   */
/*  - trending legs + pullbacks, occasional large candles and dojis           */
/*  - wicks and volume scale with volatility                                  */
/* -------------------------------------------------------------------------- */

const SERIES_LEN = 512;

function buildSeries(seed) {
  const rnd = mulberry32(seed);
  const N = SERIES_LEN;

  // 1) returns with volatility clustering + fat tails
  const steps = new Float32Array(N);
  const vols = new Float32Array(N);
  let vol = 1;
  let mean = 0;
  for (let i = 0; i < N; i++) {
    vol = 0.9 * vol + 0.1 + 0.35 * (rnd() - 0.5);
    vol = Math.min(Math.max(vol, 0.45), 2.4);
    let g = gauss(rnd);
    if (rnd() < 0.04) g *= 2.2; // occasional impulse candle
    steps[i] = g * vol;
    vols[i] = vol;
    mean += steps[i];
  }
  mean /= N;

  // 2) bridge the walk so the chart loops seamlessly, then add slow trend legs
  const walk = new Float32Array(N);
  let acc = 0;
  let walkMax = 0;
  for (let i = 0; i < N; i++) {
    steps[i] -= mean;
    acc += steps[i];
    walk[i] = acc; // walk[N - 1] === 0
    walkMax = Math.max(walkMax, Math.abs(acc));
  }
  const phase2 = rnd() * TAU;
  const path = new Float32Array(N);
  let max = 0;
  for (let i = 0; i < N; i++) {
    const x = (i / N) * TAU;
    path[i] = walk[i] + walkMax * (0.6 * Math.sin(9 * x + seed) + 0.2 * Math.sin(23 * x + phase2));
    max = Math.max(max, Math.abs(path[i]));
  }

  // 3) OHLC + volume (all normalised to roughly -1..1 / 0..1)
  const open = new Float32Array(N);
  const close = new Float32Array(N);
  const high = new Float32Array(N);
  const low = new Float32Array(N);
  const volume = new Float32Array(N);
  let volMax = 0;
  for (let i = 0; i < N; i++) {
    const o = path[(i + N - 1) % N];
    const c = path[i];
    const body = Math.abs(c - o);
    const wu = vols[i] * (0.08 + 1.1 * rnd() * rnd());
    const wd = vols[i] * (0.08 + 1.1 * rnd() * rnd());
    open[i] = o / max;
    close[i] = c / max;
    high[i] = (Math.max(o, c) + wu) / max;
    low[i] = (Math.min(o, c) - wd) / max;
    volume[i] = 0.25 * vols[i] + 0.35 * body + 0.4 * rnd();
    volMax = Math.max(volMax, volume[i]);
  }
  for (let i = 0; i < N; i++) volume[i] /= volMax;

  return { open, close, high, low, volume };
}

/* -------------------------------------------------------------------------- */
/*  Candle instanced layers (soft glow / wicks / volume / bodies)             */
/* -------------------------------------------------------------------------- */

const CANDLE_VERT = /* glsl */ `
  attribute vec4 aTint;
  varying vec4 vTint;
  varying vec2 vUv;
  void main() {
    vTint = aTint;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;

const CANDLE_FRAG = /* glsl */ `
  uniform float uGlow;
  varying vec4 vTint;
  varying vec2 vUv;
  void main() {
    float a = vTint.a;
    if (uGlow > 0.5) {
      float d = length((vUv - 0.5) * 2.0);
      a *= pow(clamp(1.0 - d, 0.0, 1.0), 2.0);
    }
    gl_FragColor = vec4(vTint.rgb, a);
  }
`;

function createLayer(count, glow) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const tint = new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4);
  tint.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("aTint", tint);
  const material = new THREE.ShaderMaterial({
    vertexShader: CANDLE_VERT,
    fragmentShader: CANDLE_FRAG,
    uniforms: { uGlow: { value: glow ? 1 : 0 } },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: glow ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  return { geometry, material, tint };
}

const _dummy = new THREE.Object3D();

function place(mesh, index, x, y, sx, sy) {
  _dummy.position.set(x, y, 0);
  _dummy.scale.set(sx, sy, 1);
  _dummy.updateMatrix();
  mesh.setMatrixAt(index, _dummy.matrix);
}

function Candles({ perSide, zone, amp, intensity, timeRef }) {
  const slots = perSide + 1;
  const count = slots * 2; // left + right edge

  const series = useMemo(() => [buildSeries(7), buildSeries(21)], []);
  const layers = useMemo(
    () => ({
      glow: createLayer(count, true),
      vol: createLayer(count, false),
      wick: createLayer(count * 2, false),
      body: createLayer(count, false),
    }),
    [count]
  );

  const glowRef = useRef(null);
  const volRef = useRef(null);
  const wickRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(
    () => () => {
      Object.values(layers).forEach((l) => {
        l.geometry.dispose();
        l.material.dispose();
      });
    },
    [layers]
  );

  useFrame((state) => {
    const glow = glowRef.current;
    const vol = volRef.current;
    const wick = wickRef.current;
    const body = bodyRef.current;
    if (!glow || !vol || !wick || !body) return;

    const t = timeRef.current;
    const { width: W, height: H } = state.viewport;
    const px = state.size.height / H; // CSS pixels per world unit
    const yScale = amp * H;
    const minBody = 1.5 / px; // doji candles still show as a thin line
    const wickW = 1.3 / px; // crisp ~1px wicks
    const u = t * SCROLL_SPEED;
    const fl = Math.floor(u);
    const fr = u - fl;

    let ci = 0;
    for (let z = 0; z < 2; z++) {
      const left = z === 0;
      const zoneW = W * zone;
      const xa = left ? -W / 2 - W * 0.05 : W / 2 - zoneW;
      const xb = left ? -W / 2 + zoneW : W / 2 + W * 0.05;
      const len = xb - xa;
      const spacing = len / perSide;
      const fadeA = left ? 0.06 : 0.45; // fade near xa
      const fadeB = left ? 0.45 : 0.06; // fade near xb
      const s = series[z];
      // very slow vertical drift of the whole chart
      const cy = (left ? 0.04 : -0.06) * H + Math.sin(t * 0.17 + z * 2.1) * 0.02 * H;
      const volBase = -0.44 * H;
      const bw = spacing * 0.62;

      for (let k = 0; k < slots; k++, ci++) {
        const a = k + fl; // absolute candle index
        const x = xa + (k - fr) * spacing;
        const tt = (x - xa) / len;
        const env = ramp(tt, fadeA) * ramp(1 - tt, fadeB) * intensity * OPACITY;

        const i0 = a % SERIES_LEN;
        const o = cy + s.open[i0] * yScale;
        const c = cy + s.close[i0] * yScale;
        const col = c >= o ? GREEN : RED;

        const top = Math.max(o, c);
        const bot = Math.min(o, c);
        const bodyH = Math.max(top - bot, minBody);
        const mid = (top + bot) / 2;
        const bTop = mid + bodyH / 2;
        const bBot = mid - bodyH / 2;
        const hi = Math.max(cy + s.high[i0] * yScale, bTop);
        const lo = Math.min(cy + s.low[i0] * yScale, bBot);

        // very tight soft halo (kept faint on purpose)
        place(glow, ci, x, (hi + lo) / 2, bw * 2.2, hi - lo + bw * 1.2);
        layers.glow.tint.setXYZW(ci, col[0], col[1], col[2], 0.07 * env);

        // wicks (upper + lower so they never cross the body)
        place(wick, ci * 2, x, (bTop + hi) / 2, wickW, hi - bTop);
        place(wick, ci * 2 + 1, x, (bBot + lo) / 2, wickW, bBot - lo);
        layers.wick.tint.setXYZW(ci * 2, col[0], col[1], col[2], 0.85 * env);
        layers.wick.tint.setXYZW(ci * 2 + 1, col[0], col[1], col[2], 0.85 * env);

        // solid body
        place(body, ci, x, mid, bw, bodyH);
        layers.body.tint.setXYZW(ci, col[0], col[1], col[2], 0.9 * env);

        // volume histogram along the bottom
        const vh = Math.max(s.volume[i0] * 0.1 * H, minBody);
        place(vol, ci, x, volBase + vh / 2, bw, vh);
        layers.vol.tint.setXYZW(ci, col[0], col[1], col[2], 0.16 * env);
      }
    }

    glow.instanceMatrix.needsUpdate = true;
    vol.instanceMatrix.needsUpdate = true;
    wick.instanceMatrix.needsUpdate = true;
    body.instanceMatrix.needsUpdate = true;
    layers.glow.tint.needsUpdate = true;
    layers.vol.tint.needsUpdate = true;
    layers.wick.tint.needsUpdate = true;
    layers.body.tint.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={glowRef} args={[layers.glow.geometry, layers.glow.material, count]} frustumCulled={false} renderOrder={1} />
      <instancedMesh ref={volRef} args={[layers.vol.geometry, layers.vol.material, count]} frustumCulled={false} renderOrder={2} />
      <instancedMesh ref={wickRef} args={[layers.wick.geometry, layers.wick.material, count * 2]} frustumCulled={false} renderOrder={3} />
      <instancedMesh ref={bodyRef} args={[layers.body.geometry, layers.body.material, count]} frustumCulled={false} renderOrder={4} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Market trend lines                                                        */
/* -------------------------------------------------------------------------- */

function MarketLines({ timeRef }) {
  const lines = useMemo(
    () =>
      LINE_DEFS.map((def) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(LINE_SEGMENTS * 3);
        const colors = new Float32Array(LINE_SEGMENTS * 3);
        const c = new THREE.Color(def.color);
        for (let i = 0; i < LINE_SEGMENTS; i++) {
          const u = i / (LINE_SEGMENTS - 1);
          const env = ramp(u, 0.18) * ramp(1 - u, 0.18) * def.gain;
          colors[i * 3] = c.r * env;
          colors[i * 3 + 1] = c.g * env;
          colors[i * 3 + 2] = c.b * env;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const material = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: false,
          fog: false,
        });
        const line = new THREE.Line(geometry, material);
        line.frustumCulled = false;
        line.renderOrder = 0;
        return { def, line, positions, geometry, material };
      }),
    []
  );
  const linesRef = useRef(lines);

  useEffect(
    () => () => {
      lines.forEach((l) => {
        l.geometry.dispose();
        l.material.dispose();
      });
    },
    [lines]
  );

  useFrame((state) => {
    const t = timeRef.current;
    const { width: W, height: H } = state.viewport;
    const animatedLines = linesRef.current;
    for (let n = 0; n < animatedLines.length; n++) {
      const { def, positions, geometry } = animatedLines[n];
      for (let i = 0; i < LINE_SEGMENTS; i++) {
        const u = i / (LINE_SEGMENTS - 1);
        const y =
          H *
          (def.y +
            def.trend * (u - 0.5) +
            def.a1 * Math.sin(u * TAU * def.f1 + t * def.s1 + def.p1) +
            def.a2 * Math.sin(u * TAU * def.f2 - t * def.s2 + def.p2));
        positions[i * 3] = (u - 0.5) * W;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = -0.5;
      }
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {lines.map((l, i) => (
        <primitive key={i} object={l.line} />
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Faint perspective grid (floor that slowly drifts toward the viewer)       */
/* -------------------------------------------------------------------------- */

const GRID_SIZE = 120;
const GRID_DIVISIONS = 60;

function PerspectiveGrid({ timeRef }) {
  const gridRef = useRef(null);
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, "#1c2823", "#1c2823");
    const m = g.material;
    m.transparent = true;
    m.opacity = 0.16;
    m.depthWrite = false;
    m.depthTest = false;
    m.blending = THREE.AdditiveBlending;
    g.position.y = -3.6;
    g.frustumCulled = false;
    g.renderOrder = 0;
    return g;
  }, []);

  useEffect(
    () => () => {
      grid.geometry.dispose();
      grid.material.dispose();
    },
    [grid]
  );

  useFrame(() => {
    const cell = GRID_SIZE / GRID_DIVISIONS;
    if (gridRef.current) {
      gridRef.current.position.z = (timeRef.current * 0.35) % cell;
    }
  });

  return <primitive object={grid} ref={gridRef} />;
}

/* -------------------------------------------------------------------------- */
/*  Particles                                                                 */
/* -------------------------------------------------------------------------- */

function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function Particles({ count, timeRef }) {
  const { geometry, material, seeds, texture, positions, colors } = useMemo(() => {
    const rnd = mulberry32(1234);
    const seeds = new Float32Array(count * 4); // x, y, speed, phase
    for (let i = 0; i < count; i++) {
      seeds[i * 4] = rnd() - 0.5;
      seeds[i * 4 + 1] = rnd();
      seeds[i * 4 + 2] = 0.004 + rnd() * 0.01;
      seeds[i * 4 + 3] = rnd() * TAU;
    }
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const texture = makeDotTexture();
    const material = new THREE.PointsMaterial({
      size: 0.09,
      sizeAttenuation: true,
      map: texture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    return { geometry, material, seeds, texture, positions, colors };
  }, [count]);

  const points = useMemo(() => {
    const p = new THREE.Points(geometry, material);
    p.frustumCulled = false;
    p.renderOrder = 5;
    return p;
  }, [geometry, material]);
  const pointsRef = useRef(null);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    },
    [geometry, material, texture]
  );

  // neutral, slightly cool grey instead of green
  const base = useMemo(() => new THREE.Color("#8fa39a"), []);

  useFrame((state) => {
    const pointGeometry = pointsRef.current?.geometry;
    if (!pointGeometry) return;
    const positionArray = pointGeometry.attributes.position.array;
    const colorArray = pointGeometry.attributes.color.array;
    const t = timeRef.current;
    const { width: W, height: H } = state.viewport;
    for (let i = 0; i < count; i++) {
      const nx = seeds[i * 4];
      const ny = seeds[i * 4 + 1];
      const speed = seeds[i * 4 + 2];
      const phase = seeds[i * 4 + 3];
      const fy = (ny + t * speed) % 1;
      positionArray[i * 3] = nx * W + Math.sin(t * 0.25 + phase) * 0.12;
      positionArray[i * 3 + 1] = (fy - 0.5) * H;
      positionArray[i * 3 + 2] = -1 - (i % 5) * 0.8;
      const env = Math.sin(Math.PI * fy) * (0.55 + 0.45 * Math.sin(t * 0.9 + phase)) * 0.3;
      colorArray[i * 3] = base.r * env;
      colorArray[i * 3 + 1] = base.g * env;
      colorArray[i * 3 + 2] = base.b * env;
    }
    pointGeometry.attributes.position.needsUpdate = true;
    pointGeometry.attributes.color.needsUpdate = true;
  });

  return <primitive object={points} ref={pointsRef} />;
}

/* -------------------------------------------------------------------------- */
/*  Ambient glow + vignette (full-screen shader, no camera dependence)        */
/* -------------------------------------------------------------------------- */

function BackgroundGlow({ timeRef }) {
  const meshRef = useRef(null);
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBg: { value: new THREE.Vector3(BG[0], BG[1], BG[2]) },
        uGlow: { value: new THREE.Vector3(AMBIENT_GLOW[0], AMBIENT_GLOW[1], AMBIENT_GLOW[2]) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uBg;
        uniform vec3 uGlow;
        varying vec2 vUv;
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        void main() {
          vec2 uv = vUv;
          float pulse = 0.92 + 0.08 * sin(uTime * 0.25);
          float gl = exp(-pow(length((uv - vec2(0.12, 0.52)) * vec2(1.0, 1.5)) / 0.5, 2.0));
          float gr = exp(-pow(length((uv - vec2(0.88, 0.48)) * vec2(1.0, 1.5)) / 0.5, 2.0));
          float gb = exp(-pow(length((uv - vec2(0.5, -0.05)) * vec2(0.8, 1.6)) / 0.6, 2.0));
          vec3 col = uBg + uGlow * (gl * 0.9 + gr * 0.8 + gb * 0.5) * pulse;
          float v = smoothstep(0.45, 1.05, length((uv - 0.5) * vec2(1.15, 1.0)) * 1.4);
          col *= 1.0 - 0.45 * v;
          col += (hash(gl_FragCoord.xy) - 0.5) / 255.0; // dithering, avoids banding
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });
    return { geometry, material };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = timeRef.current;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} frustumCulled={false} renderOrder={-10} />;
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

// Single shared clock. Delta is clamped so the scene never "jumps" after a
// pause (hidden tab, scrolled away, slow frame).
function Driver({ animate, timeRef }) {
  useFrame((_, delta) => {
    if (animate) timeRef.current += Math.min(delta, 0.05);
  }, -1);
  return null;
}

function Scene({ animate }) {
  const width = useThree((s) => s.size.width);
  const timeRef = useRef(animate ? 0 : STATIC_TIME);
  const tier = width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop";
  const cfg = TIERS[tier];

  return (
    <>
      <fog attach="fog" args={[BG_HEX, 14, 60]} />
      <Driver animate={animate} timeRef={timeRef} />
      <BackgroundGlow timeRef={timeRef} />
      <PerspectiveGrid timeRef={timeRef} />
      <MarketLines timeRef={timeRef} />
      <Candles
        key={tier}
        perSide={cfg.perSide}
        zone={cfg.zone}
        amp={cfg.amp}
        intensity={cfg.intensity}
        timeRef={timeRef}
      />
      <Particles key={`p-${tier}`} count={cfg.particles} timeRef={timeRef} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Error boundary (if WebGL is unavailable the CSS fallback stays visible)   */
/* -------------------------------------------------------------------------- */

class BackgroundBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */

const FALLBACK_BACKGROUND = [
  "radial-gradient(55% 60% at 12% 52%, rgba(120,150,130,0.04), transparent 70%)",
  "radial-gradient(55% 60% at 88% 48%, rgba(120,150,130,0.035), transparent 70%)",
].join(",");

const EDGE_BLEND = `linear-gradient(to bottom, ${BG_HEX} 0%, rgba(8,8,8,0) 12%, rgba(8,8,8,0) 88%, ${BG_HEX} 100%)`;

export default function TradingBackground({
  className = "",
  zIndex = -10,
  blendEdges = true,
}) {
  const wrapRef = useRef(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const compact = typeof window !== "undefined" && window.innerWidth < 768;
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible"
  );
  const [inView, setInView] = useState(true);
  const [dpr, setDpr] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 1.25 : 1.5
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMotion = (e) => setReduced(e.matches);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    mq.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);

    let observer;
    if (wrapRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
        rootMargin: "100px",
      });
      observer.observe(wrapRef.current);
    }

    return () => {
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  // reduced motion -> render a single static frame; hidden/offscreen -> stop loop
  const frameloop = reduced ? "demand" : pageVisible && inView ? "always" : "never";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex, backgroundColor: BG_HEX, backgroundImage: FALLBACK_BACKGROUND }}
    >
      {mounted && (
        <BackgroundBoundary>
          <Canvas
            frameloop={frameloop}
            dpr={[1, dpr]}
            flat
            camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 120 }}
            gl={{ antialias: !compact, alpha: false, powerPreference: "high-performance" }}
            style={{ pointerEvents: "none" }}
          >
            <PerformanceMonitor onDecline={() => setDpr(1)} />
            <Scene animate={!reduced} />
          </Canvas>
        </BackgroundBoundary>
      )}

      {blendEdges && (
        <div className="absolute inset-0" style={{ backgroundImage: EDGE_BLEND }} />
      )}
    </div>
  );
}