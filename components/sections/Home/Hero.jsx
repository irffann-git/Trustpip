"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShapeGrid from "../../ShapeGrid";
import TechText from "../../TechText";
import StarBorder from "../../StarBorder";
import TickerCards from "./TickerCards";


// Box height as a multiple of the font size (lower = tighter lines)
const LINE_BOX = 1.2;
// Gap between the two lines in px
const LINE_GAP = 2;
// Where the button takes the visitor
const KNOW_MORE_HREF = "/services";

// Scales the font so each line fits the screen width on mobile, tablet and desktop
function useFontSizes() {
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const usable = width * 0.92;
  const line1 = Math.max(18, Math.min(110, Math.floor(usable / (28 * 0.62))));
  const line2 = Math.max(16, Math.min(90, Math.floor(usable / (17 * 0.62))));
  return { line1, line2 };
}

const techTextProps = {
  fontWeight: 600,
  reveal: "letter",
  dashLength: 4,
  dashGap: 2,
  specks: 15,
  intro: "Type",
  introDuration: 2,
  clickKick: true,
  guides: false,
  fontFamily: "",
  letterSpacing: -0.05,
  reach: 200,
  softness: 0.7,
  lineStyle: "dashed",
  strokeWidth: 1.5,
  speed: 1,
  bounce: 0.4,
  selection: true,
  labels: true,
  align: "center",
  draggable: true,
  sweep: true,
};

function Hero() {
  const { line1, line2 } = useFontSizes();
  const router = useRouter();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "visible", // text is allowed to extend past the hero
      }}
    >
      {/* Forces every element inside the text layer to show its overflow */}
      <style>{`
        .hero-text,
        .hero-text * {
          overflow: visible !important;
        }
      `}</style>

      {/* Background layer: the clipping stays here only */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <ShapeGrid
          shape="square"
          direction="none"
          lineColor="#577824"
          hoverColor="#7ecd07"
          hoverFillColor="#7ecd07"
          fillOpacity={0.2}
          cellSize={61}
          speed={0.85}
          tiltX={0}
          tiltY={0}
          rainbow={false}
          lineWidth={0.5}
          radius={1.5}
          trail={0.7}
          glow={1}
          twinkle={0}
          fade={1}
          clickCascade={false}
          intro={false}
        />
      </div>

      {/* Hero text layer */}
      <div
        className="hero-text"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: `${LINE_GAP}px`,
          padding: "0 4vw",
          pointerEvents: "none", // lets the grid hover effect work around the text
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${Math.round(line1 * LINE_BOX)}px`,
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          <TechText
            {...techTextProps}
            text="BEST  FOREX  TRADING  INSTITUTE"
            fontSize={line1}
            color="#ffffff"
            accentColor="#7ecd07"
          />
        </div>

        <div
          style={{
            width: "100%",
            height: `${Math.round(line2 * LINE_BOX)}px`,
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          <TechText
            {...techTextProps}
            text="IN  CALICUT  KERALA"
            fontSize={line2}
            color="#ffffff"
            accentColor="#7ecd07"
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            margin: "20px 0 0",
            maxWidth: "46rem",
            textAlign: "center",
            fontSize: "clamp(14px, 2.2vw, 22px)",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          <span style={{ color: "#7ecd07", fontWeight: 600 }}>
            Learn, Trade, Excel
          </span>{" "}
          with the best forex trading institute in Calicut
        </p>

        {/* Button */}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            pointerEvents: "auto",
          }}
        >
          <StarBorder
            onClick={() => router.push(KNOW_MORE_HREF)}
            color="#7ecd07"
            trailColor="#7ecd07"
            duration={4}
            direction="clockwise"
            stars={1}
            trailLength={3}
            thickness={1}
            radius={26}
            glow={2}
            hover="lap"
            sparkle={true}
            clickPulse
            theme="dark"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "clamp(150px, 32vw, 200px)",
                height: "clamp(44px, 6vw, 52px)",
                fontSize: "clamp(14px, 1.8vw, 17px)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              Know More.
            </span>
          </StarBorder>
        </div>
      </div>

      {/* Market ticker: pinned to the bottom of the hero */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(24, 22, 29, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <TickerCards />
      </div>
    </div>
  );
}

export default Hero;