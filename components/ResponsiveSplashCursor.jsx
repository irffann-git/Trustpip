
"use client";

import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";

// Desktop: keep your original effect exactly the same
const DESKTOP = {
  rainbow: false,
  size: 1,
  force: 1,
  swirl: 3,
  trail: 1,
  clickSplash: true,
  colorSpeed: 1,
  intensity: 1,
  momentum: 1,
  shading: 1,
  glow: 0,
  quality: "high",
  intro: true,
  contained: false,
};

// Mobile: subtle effect with reduced intensity
const MOBILE = {
  rainbow: false,
  size: 0.15,
  force: 0.12,
  swirl: 0.6,
  trail: 0.2,
  clickSplash: false,
  colorSpeed: 0.5,
  intensity: 0.2,
  momentum: 0.3,
  shading: 0.25,
  glow: 0,
  quality: "low",
  intro: false,
  contained: false,
};

export default function ResponsiveSplashCursor() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleScreenChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleScreenChange();

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  // Prevent the desktop intro animation from appearing on mobile
  if (isMobile === null) return null;

  return (
    <SplashCursor
      key={isMobile ? "mobile" : "desktop"}
      {...(isMobile ? MOBILE : DESKTOP)}
    />
  );
}

