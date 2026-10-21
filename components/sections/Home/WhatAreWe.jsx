"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TradingBackground from "@/components/TradingBackground";
import { ArrowRight } from "lucide-react";

function WhatAreWe() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#080808] px-6 py-20 md:px-12 lg:px-20 lg:py-28"
    >
      {/* Existing animated trading background */}
      <TradingBackground />

      {/* Main content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

        {/* Left Content */}
        <div className="max-w-2xl">

          {/* Section Label */}
          <div className="mb-5 flex items-center gap-4">
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            What are we
            <span className="text-[#7ecd07]">?</span>
          </h2>

          {/* Small Green Accent */}
          <div className="mt-4 h-0.5 w-50 rounded-full bg-[#7ecd07]" />

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-white sm:text-xl">
            At TRUST PIP, we focus on building trading mastery through
            clarity, discipline, and expert mentorship. Our structured
            programs cover everything from basics to advanced strategies,
            with real-world application, risk management, and mindset at
            the core. With practical learning and a supportive community,
            we help traders grow with confidence and consistency.
          </p>

          {/* Read More Button */}
          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#7ecd07] px-8 py-4 text-md font-semibold text-black transition-all duration-300 hover:bg-[#9DDF4B] hover:shadow-[0_0_25px_rgba(139,203,61,0.2)]"
          >
            Read More

            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Right Content - Trust PIP Logo */}
<div className="flex flex-col items-center justify-center">

  {/* Circular Logo Container */}
  <div className="relative flex aspect-square w-80 items-center justify-center rounded-full border border-[#7ecd07]/50 bg-black/20 p-8 sm:w-96 lg:w-[460px]">

    {/* Subtle Green Glow */}
    <div className="pointer-events-none absolute inset-15 rounded-full bg-[#7ecd07]/25 blur-3xl" />

    {/* Trust PIP Logo */}
    <Image
      src="/images/trustPip_Logo.png"
      alt="Trust PIP Trading Institute Logo"
      width={600}
      height={600}
      priority
      className="relative z-10 h-full w-full object-contain"
    />


  </div>
</div>

      </div>
    </section>
  );
}

export default WhatAreWe;



