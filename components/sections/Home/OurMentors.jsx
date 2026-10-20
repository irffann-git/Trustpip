"use client";

import React from "react";
import Image from "next/image";

const mentors = [
  {
    id: 1,
    name: "Mr.Fasal",
    image: "/images/mentor1.png",
    experience: "7+ Years of Experience",
    specialization: "Gold",
  },
  {
    id: 2,
    name: "Mr.Shuhaib",
    image: "/images/mentor2.png",
    experience: "6+ Years of Experience",
    specialization: "Gold",
  },
  {
    id: 3,
    name: "Mr.Nibras",
    image: "/images/mentor3.png",
    experience: "3+ Years of Experience",
    specialization: "Gold & Currency",
  },
  {
    id: 4,
    name: "Mr.Rishan",
    image: "/images/mentor4.png",
    experience: "3+ Years of Experience",
    specialization: "Currency",
  },
  {
    id: 5,
    name: "Mr.Jagath",
    image: "/images/mentor5.png",
    experience: "3+ Years of Experience",
    specialization: "Gold & Currency",
  },
];

/**
 * Border animations (CSS only, GPU friendly):
 *  - .mentor-ring : a light that travels around the circular photo border
 *  - .mentor-beam : a light that runs down the left side, along the bottom
 *                   and up the right side of the info card border
 * Change the durations (4.5s / 5s) to make them faster or slower.
 */
const BORDER_CSS = `
@property --mentor-a {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@keyframes mentor-spin {
  to { transform: rotate(360deg); }
}

@keyframes mentor-beam {
  to { --mentor-a: 360deg; }
}

.mentor-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  pointer-events: none;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    transparent 68%,
    #86c923 92%,
    #e9ffb0 99%,
    transparent 100%
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 3.5px), #000 calc(100% - 3px));
  animation: mentor-spin 4.5s linear infinite;
}

.mentor-beam {
  position: absolute;
  inset: -2px;
  padding: 2px;
  border-radius: 0 0 20px 20px;
  pointer-events: none;
  background: conic-gradient(
    from var(--mentor-a),
    transparent 0%,
    transparent 78%,
    #24340b 93%,
    #e9ffb0 99%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
  -webkit-mask-clip: content-box, border-box;
  -webkit-mask-composite: xor;
  mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
  mask-clip: content-box, border-box;
  mask-composite: exclude;
  clip-path: inset(3px 0 0 0);
  animation: mentor-beam 5s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .mentor-ring,
  .mentor-beam {
    display: none;
  }
}
`;

export default function OurMentors() {
  return (
    <section
      id="mentors"
      className="relative isolate overflow-hidden bg-black px-5 py-16 text-white sm:px-8 sm:py-20"
    >
      <style>{BORDER_CSS}</style>

      {/* Background green glow (unchanged, static) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[75%] bg-[radial-gradient(ellipse_at_85%_50%,rgba(0,100,0,0.40),transparent_65%)]"
      />

      {/* Section heading */}
      <div className="relative z-10 mx-auto mb-16 text-center sm:mb-20">
        <h2 className="font-serif text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Our Mentors
        </h2>
      </div>

      {/* Mentor cards */}
      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-x-16 gap-y-20 sm:grid-cols-2 sm:gap-y-24 lg:grid-cols-6 lg:gap-x-10">
        {mentors.map((mentor, index) => {
          // negative delay so the cards are not all in sync
          const stagger = { animationDelay: `-${index * 0.9}s` };

          return (
            <div
              key={mentor.id}
              className={`
                group relative flex w-full max-w-[265px] flex-col items-center
                pt-2 text-center
                ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                ${
                  index === 0
                    ? "lg:col-start-1"
                    : index === 1
                      ? "lg:col-start-4"
                      : index === 2
                        ? "lg:col-start-1"
                        : index === 3
                          ? "lg:col-start-3"
                          : "lg:col-start-5"
                }
              `}
            >
              {/* Profile image with animated circular green border */}
              <div className="relative z-10 -mb-1 h-[190px] w-[190px] sm:h-[200px] sm:w-[200px]">
                {/* Ring layers scale together on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                >
                  {/* Static base ring */}
                  <div
                    className="absolute inset-0 rounded-full border-[3px] border-[#86c923]/55 transition-colors duration-300 group-hover:border-[#86c923]"
                    style={{
                      clipPath: "polygon(0 0, 78% 0, 100% 20%, 100% 100%, 0 100%)",
                    }}
                  />

                  {/* Light travelling around the ring */}
                  <span className="mentor-ring" style={stagger} />
                </div>

                {/* Mentor photo */}
                <div className="absolute inset-[5px] overflow-hidden rounded-full">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    sizes="200px"
                    className="object-cover object-top grayscale transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Information card with animated border */}
              <div className="relative mt-6 flex min-h-[100px] w-full flex-col items-center justify-center rounded-b-[20px] border-x-2 border-b-2 border-[#86c923]/55 px-3 pb-3 pt-1 transition-[border-color,box-shadow] duration-300 group-hover:border-[#86c923] group-hover:shadow-[0_0_22px_rgba(134,201,35,0.16)]">
                {/* Light running along the card border */}
                <span aria-hidden="true" className="mentor-beam" style={stagger} />

                <h3 className="text-2xl font-bold leading-tight sm:text-[26px]">
                  {mentor.name}
                </h3>

                <p className="mt-1 text-sm leading-[18px] text-white sm:text-[15px]">
                  {mentor.experience}
                </p>

                <p className="text-sm leading-[18px] text-white sm:text-[15px]">
                  in Forex Market
                </p>

                <p className="text-sm leading-[18px] text-white sm:text-[15px]">
                  Specialised in{" "}
                  <span className="font-bold">{mentor.specialization}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}