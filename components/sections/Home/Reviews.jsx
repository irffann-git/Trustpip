"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";

/**
 * PLACEHOLDER REVIEWS: replace these with real reviews from your students
 * (with their permission).
 *   name   : student name
 *   role   : program they joined
 *   image  : photo in /public/images/reviews/ (if missing, initials are shown)
 *   rating : 1 to 5 stars (defaults to 5)
 *   quote  : the review message (keep it to about 150 characters)
 */
const REVIEWS = [
  {
    name: "Rinshad",
    image: "/images/rinshad.png",
    rating: 5,
    quote:
      "Before joining this forex trading program, I didn’t clearly understand how the market works. The lessons were simple and well-structured, which helped me follow a clear strategy with proper risk management. Now I trade with more confidence and a calm mindset.",
  },
  {
    name: "Vishnu",
    image: "/images/vishnu.png",
    rating: 5,
    quote:
      "The mentorship and support throughout this forex training were excellent. Doubts were cleared patiently, and the guidance was always practical and honest. The focus was on building real skills and disciplined trading, which gave me a strong foundation to grow as a trader.",
  },
  {
    name: "Musthafa C H",
    image: "/images/musthafa.png",
    rating: 5,
    quote:
      "What stood out most was the honest and clear teaching. The course focused on understanding the real market and building long-term skills, not shortcuts. It helped me gain confidence and a strong foundation to grow as a trader.",
  },
  {
    name: "Vaseem",
    image: "/images/vaseem.png",
    rating: 5,
    quote:
      "This program changed how I look at trading. I learned to analyze the market, control emotions, and follow a clear strategy. The structured and supportive learning made forex trading easy to understand.",
  },
  {
    name: "Shajahan",
    image: "/images/shajahan.png",
    rating: 5,
    quote:
      "Before joining this program, I had very little understanding of the forex market. The clear lessons and focus on discipline helped me stop guessing trades. This training gave me confidence and a strong foundation to trade professionally.",
  },
  {
    name: "Rasilkhan",
    image: "/images/Rasilkhan.png",
    rating: 5,
    quote:
      "The mentorship was honest and realistic, with no shortcuts or false promises. The focus was on clear guidance, practical knowledge, and understanding real market conditions. This approach helped me build confidence and develop skills for long-term trading growth.",
  },
  {
    name: "Shad C",
    image: "/images/Shad.png",
    rating: 5,
    quote:
      "The course focused strongly on discipline and understanding how the real market works. Instead of shortcuts, it emphasized patience, proper analysis, and consistency. This training gave me a strong foundation and the confidence to continue growing as a trader over the long term.",
  },
  {
    name: "Rishin",

    image: "/images/rishin.png",
    rating: 5,
    quote:
      "The course focused strongly on discipline and understanding how the real market works. Instead of shortcuts, it emphasized patience, proper analysis, and consistency. This training gave me a strong foundation and the confidence to continue growing as a trader over the long term.",
  },
  
];

/**
 * Smooth sliding is pure CSS (runs on the GPU, no JavaScript per frame).
 * Change the speed with the `duration` props on the two <Row /> components below.
 */
const MARQUEE_CSS = `
@keyframes reviews-left {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@keyframes reviews-right {
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
}

.reviews-track {
  display: flex;
  width: max-content;
  animation: reviews-left var(--dur, 50s) linear infinite;
  will-change: transform;
}

.reviews-track-right {
  animation-name: reviews-right;
}

.reviews-row:hover .reviews-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .reviews-track {
    animation: none;
  }
  .reviews-row {
    overflow-x: auto;
  }
}
`;

const initialsOf = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ------------------------------ Avatar ------------------------------ */

function Avatar({ name, src }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#7ecd07]/60 ring-offset-2 ring-offset-black">
      {showImage ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="48px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-[#7ecd07]/15 text-base font-bold text-[#7ecd07]">
          {initialsOf(name)}
        </span>
      )}
    </div>
  );
}

/* ------------------------------ Stars ------------------------------- */

function Stars({ rating = 5 }) {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={17}
          aria-hidden="true"
          className={
            i < rating ? "fill-[#7ecd07] text-[#7ecd07]" : "text-white/20"
          }
        />
      ))}
    </div>
  );
}

/* --------------------------- Review card ---------------------------- */

function ReviewCard({ review, duplicate }) {
  return (
    <article
      aria-hidden={duplicate || undefined}
      className="group mr-5 flex w-[300px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#7ecd07]/60 hover:shadow-[0_12px_40px_rgba(126,205,7,0.12)] sm:mr-6 sm:w-[360px]"
    >
      {/* Stars + quote mark */}
      <div className="flex items-center justify-between">
        <Stars rating={review.rating ?? 5} />
        <Quote
          size={30}
          aria-hidden="true"
          className="fill-[#7ecd07]/15 text-[#7ecd07]/40 transition-colors duration-300 group-hover:text-[#7ecd07]"
        />
      </div>

      {/* Message */}
      <p className="mt-5 flex-1 text-[15px] leading-7 text-white/80">
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Student */}
      <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
        <Avatar name={review.name} src={review.image} />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{review.name}</p>
          <p className="truncate text-xs text-white/50">{review.role}</p>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------- Row -------------------------------- */

function Row({ items, reverse = false, duration = 50 }) {
  // Each set is repeated so the row is always wider than the screen,
  // then the whole set is duplicated for the seamless loop.
  const set = [...items, ...items];

  return (
    <div className="reviews-row overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={`reviews-track ${reverse ? "reviews-track-right" : ""}`}
        style={{ "--dur": `${duration}s` }}
      >
        {[0, 1].map((copy) =>
          set.map((review, i) => (
            <ReviewCard
              key={`${copy}-${i}`}
              review={review}
              duplicate={copy === 1 || i >= items.length}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Section ----------------------------- */

export default function Reviews() {
  const half = Math.ceil(REVIEWS.length / 2);
  const rowOne = REVIEWS.slice(0, half);
  const rowTwo = REVIEWS.slice(half);

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden bg-black py-16 lg:py-24"
    >
      <style>{MARQUEE_CSS}</style>

      {/* Section heading */}
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <div className="mb-5 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#7ecd07]" />

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7ecd07] sm:text-sm">
            Reviews
          </span>

          <span className="h-px w-10 bg-[#7ecd07]" />
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Students success stories
          <span className="text-[#7ecd07]">.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
          Real experiences from traders learning with Trust PIP.
        </p>
      </div>

      {/* Two rows sliding in opposite directions (pause on hover) */}
      <div
        role="region"
        aria-label="Student reviews"
        className="mt-12 space-y-2 lg:mt-16"
      >
        <Row items={rowOne} duration={55} />
        <Row items={rowTwo} reverse duration={65} />
      </div>
    </section>
  );
}