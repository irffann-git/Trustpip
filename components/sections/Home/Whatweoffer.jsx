"use client";

import React from "react";
import CircularGallery from "@/components/CircularGallery";

// Files must exist in /public/images/ (names are case-sensitive on Linux hosts)
const OFFERS = [
  {
    image: "/images/online_mentorship.jpeg",
    text: "Online Mentorship",
    description:
      "Learn the basics of financial markets, currency pairs, pips, lots, leverage, and trading fundamentals.",
  },
  {
    image: "/images/offline_mentorship.jpeg",
    text: "Offline Mentorship",
    description:
      "Learn technical analysis, candlestick patterns, support and resistance, trends, and chart reading.",
  },
  {
    image: "/images/tading_cafe.avif",
    text: "Guided Trading Cafe",
    description:
      "Explore trading setups, price action, entry rules, and structured market analysis.",
  },
  {
    image: "/images/trading_ai.jpeg",
    text: "Trading AI Robots",
    description:
      "Explore automated trading systems, algorithmic strategies, and trading automation.",
  },
  {
    image: "/images/indicator_development.jpeg",
    text: "Indicator Development",
    description:
      "Learn how trading indicators work and how custom indicators can support market analysis.",
  },
  {
    image: "/images/vps.avif",
    text: "VPS Services",
    description:
      "Explore virtual private servers for hosting trading applications and automated trading systems.",
  },
];

export default function WhatWeOffer() {
  return (
    <section
      id="offer"
      className="relative isolate overflow-hidden bg-[#000000] px-5 py-16 sm:px-8 md:px-12 lg:px-20 lg:py-24"
    >
  
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#8BCB3D]" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8BCB3D] sm:text-sm">
              Our Programs
            </span>

            <span className="h-px w-10 bg-[#8BCB3D]" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            What we offer
            <span className="text-[#8BCB3D]">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Explore our programs, services, and trading technology solutions
            designed to help you develop your market knowledge.
          </p>
        </div>

        {/* Gallery: the parent MUST have a height */}
        <div className="relative mt-10 h-[460px] w-full sm:h-[540px] lg:h-[600px]">
          <CircularGallery
            items={OFFERS}
            bend={2.5}
            textColor="#ffffff"
            borderRadius={0.08}
            scrollEase={0.05}
            itemSize={0.98}
            itemAspect={0.74}
            gap={0.24}
            wave={1.2}
            fadeEdges={0.17}
            shadow={0.3}
            scrollSpeed={3.4}
            autoScroll={1}
            snap
            grayscale={false}
            showTitles
            openOnClick
            intro
          />
        </div>

        <p className="mt-4 text-center text-xs text-white/45 sm:text-sm">
          Drag or scroll to explore. Click a card to view its description.
        </p>
      </div>
    </section>
  );
}