"use client";

import { useRef, useState } from "react";
import { Play, Pause, ArrowUpRight, Volume2 } from "lucide-react";

export default function StartTradingSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle video playback
  const handleVideoToggle = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Unable to play video:", error);
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <section
      id="start-trading"
      className="relative isolate overflow-hidden bg-black px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(64,120,20,0.16),transparent_55%)]"
      />

      {/* Right-side green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-[#86c923]/10 blur-[140px]"
      />

      {/* Top subtle green line */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Start Trading{" "}
            <span className="text-[#7ecd07]">With Confidence.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Discover a smarter approach to the markets. Explore our
            trading journey and take the next step toward improving
            your trading knowledge.
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-7 h-[3px] w-16 rounded-full bg-[#86c923]" />
        </div>

        {/* Video layout */}
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">

          {/* Video side */}
          <div className="relative mx-auto w-full max-w-[360px] lg:max-w-none">

            {/* Green ambient glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[35px] bg-[#86c923]/10 opacity-70 blur-2xl transition-opacity duration-500 hover:opacity-100"
            />

            {/* Video outer frame */}
            <div className="relative rounded-[24px] border border-[#86c923]/50 bg-[#0a0d08] p-[5px] shadow-[0_0_35px_rgba(134,201,35,0.08)] transition duration-500 hover:border-[#86c923] hover:shadow-[0_0_45px_rgba(134,201,35,0.16)]">

              {/* Video */}
              <div className="relative overflow-hidden rounded-[19px] bg-[#101510]">

                <video
                  ref={videoRef}
                  className="block aspect-[3/4] w-full object-cover"
                  src="https://video.wixstatic.com/video/33dbf6_a9084c21b715480eb5dcd65602170ef5/1080p/mp4/file.mp4"
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  Your browser does not support HTML video.
                </video>

                {/* Bottom gradient */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"
                />

                {/* Top label */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#86c923]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
                    TrustPip
                  </span>
                </div>

                {/* Center play/pause button */}
                <button
                  type="button"
                  onClick={handleVideoToggle}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="group absolute left-1/2 top-1/2 flex h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#86c923]/80 bg-black/45 text-white shadow-[0_0_30px_rgba(134,201,35,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#86c923] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#86c923] focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:h-[76px] sm:w-[76px]"
                >
                  {isPlaying ? (
                    <Pause size={26} fill="currentColor" />
                  ) : (
                    <Play
                      size={27}
                      fill="currentColor"
                      className="ml-1 transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </button>

                {/* Bottom video label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-white sm:text-sm">
                      Start Your Journey
                    </p>

                    <p className="mt-1 text-[10px] text-white/60 sm:text-xs">
                      Learn. Practice. Grow.
                    </p>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-sm">
                    <Volume2 size={16} />
                  </div>
                </div>

              </div>
            </div>

            {/* Decorative corner accents */}
            <div
              aria-hidden="true"
              className="absolute -left-2 -top-2 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-[#86c923]"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-[#86c923]"
            />
          </div>

          {/* Content side */}
          <div className="mx-auto w-full max-w-lg text-center lg:mx-0 lg:text-left">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#86c923]">
              Trade With Purpose
            </p>

            <h3 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Every great trader starts with the right{" "}
              <span className="text-[#86c923]">knowledge.</span>
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
              Understanding the market is the first step toward
              making informed trading decisions. Explore our
              approach, learn the fundamentals, and build your
              knowledge one step at a time.
            </p>

            {/* Feature cards */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:border-[#86c923]/40 hover:bg-[#86c923]/[0.04]">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#86c923]/30 bg-[#86c923]/10">
                  <span className="h-2 w-2 rounded-full bg-[#86c923]" />
                </div>

                <h4 className="text-sm font-semibold text-white">
                  Market Knowledge
                </h4>

                <p className="mt-2 text-xs leading-6 text-white/45">
                  Understand market movements and trading concepts.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition duration-300 hover:border-[#86c923]/40 hover:bg-[#86c923]/[0.04]">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#86c923]/30 bg-[#86c923]/10">
                  <span className="h-2 w-2 rounded-full bg-[#86c923]" />
                </div>

                <h4 className="text-sm font-semibold text-white">
                  Trading Discipline
                </h4>

                <p className="mt-2 text-xs leading-6 text-white/45">
                  Learn the importance of patience and risk awareness.
                </p>
              </div>

            </div>

            {/* Bottom note */}
            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <div className="h-px w-8 bg-[#86c923]/60" />

              <p className="text-xs text-white/40">
                Knowledge first. Decisions second.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom subtle green line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/30 to-transparent"
      />
    </section>
  );
}