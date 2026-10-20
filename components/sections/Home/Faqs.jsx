"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus, ArrowRight, Link2, Check } from "lucide-react";

/**
 * Each FAQ can use any of these fields:
 *   a      : normal paragraph text
 *   points : array of bullet points (shown as a green dotted list)
 *   note   : small closing paragraph
 */
const FAQS = [
  {
    q: "What is Trust Pip Traders Academy?",
    a: "Trust Pip Traders Academy is a professional Forex and Stock Market education platform focused on structured learning, real-market application, and mentorship-driven trading education for beginners to advanced traders.",
  },
  {
    q: "Who can join this program?",
    a: "Anyone can join—students, beginners, working professionals, and aspiring traders. No prior experience in Forex or stock markets is required.",
  },
  {
    q: "What is the duration of the course?",
    a: "The Traders Membership programme has a duration of 4 months for both online and offline formats.",
  },
  {
    q: "What are Trading AI Robots?",
    a: "Trading AI Robots are automated trading systems that follow a defined strategy and rules. We help you understand how they work, what their limits are, and how to use automation as a tool alongside sound risk management.",
  },
  {
    q: "Do you teach live market trading?",
    a: "Yes. Students participate in live market trading sessions under expert mentor guidance, gaining real-world trading experience.",
  },
  {
    q: "What is the core focus of technical analysis training?",
    a: "The technical analysis training focuses on:",
    points: [
      "Support & Resistance (SNR)",
      "Advanced SNR concepts",
      "Liquidity Grab strategies",
      "Confirmation methods for high-probability trades",
    ],
  },
  {
    q: "Is the program fee refundable?",
    a: "No, the program fee is non-refundable.",
    points: [
      "Once the payment is made and the program access is provided, the fees are non-refundable and non-transferable.",
      "We recommend that students carefully review the program details, duration, fees, and terms before making the payment.",
    ],
    note: "Note: Refunds, if any, will be handled only in accordance with the applicable terms and policies.",
  },
];

// Plain text version of an answer (used for the SEO schema)
const plainText = (item) =>
  [item.a, item.points?.join(" "), item.note].filter(Boolean).join(" ");

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: plainText(item) },
  })),
};

/* ---------------------------- Share helpers ---------------------------- */

const ICON_PATHS = {
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

const SHARE_BUTTON =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#7ecd07] hover:bg-[#7ecd07]/10 hover:text-[#7ecd07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ecd07]";

function BrandIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

// Link to one specific question, e.g. https://yoursite.com/#faq-3
const getShareUrl = (index) =>
  `${window.location.origin}${window.location.pathname}#faq-${index}`;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const copyTimer = useRef(null);

  // Open (and scroll to) a question when the page is opened with #faq-3
  useEffect(() => {
    const match = window.location.hash.match(/^#faq-(\d+)$/);
    if (!match) return;
    const i = Number(match[1]);
    if (i < 0 || i >= FAQS.length) return;
    requestAnimationFrame(() => {
      setOpenIndex(i);
      document.getElementById(`faq-${i}`)?.scrollIntoView({ block: "center" });
    });
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const shareTo = (network, index) => {
    const url = encodeURIComponent(getShareUrl(index));
    const text = encodeURIComponent(FAQS[index].q);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[network], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const copyLink = async (index) => {
    const url = getShareUrl(index);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback for older browsers / non-secure pages
      const area = document.createElement("textarea");
      area.value = url;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopiedIndex(index);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopiedIndex(-1), 2000);
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-black px-5 py-16 sm:px-8 md:px-12 lg:px-20 lg:py-24"
    >
      {/* SEO: lets search engines read the questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#7ecd07]" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7ecd07] sm:text-sm">
              FAQs
            </span>

            <span className="h-px w-10 bg-[#7ecd07]" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Frequently asked questions
            <span className="text-[#7ecd07]">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Quick answers about our programs, services and how to get started.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 space-y-4">
          {FAQS.map((item, index) => {
            const open = openIndex === index;
            const copied = copiedIndex === index;

            return (
              <div
                key={item.q}
                id={`faq-${index}`}
                className={`scroll-mt-24 rounded-2xl border transition-[border-color,box-shadow,background-color] duration-300 ${
                  open
                    ? "border-[#7ecd07] bg-white/[0.04] shadow-[0_0_28px_rgba(139,203,61,0.12)]"
                    : "border-white/10 bg-white/[0.02] hover:border-[#8BCB3D]/40"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ecd07] sm:px-7 sm:py-6"
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {item.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
                        open
                          ? "rotate-45 border-[#7ecd07] bg-[#7ecd07] text-black"
                          : "border-white/20 text-[#8BCB3D]"
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>

                {/* Smooth height animation without measuring the content */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  aria-hidden={!open}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3 px-5 pb-6 text-sm leading-7 text-white/70 sm:px-7 sm:text-base sm:leading-8">
                      {item.a && <p>{item.a}</p>}

                      {item.points && (
                        <ul className="space-y-2.5">
                          {item.points.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8BCB3D] shadow-[0_0_8px_rgba(139,203,61,0.7)]"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.note && (
                        <p className="text-xs leading-6 text-white/50 sm:text-sm">
                          {item.note}
                        </p>
                      )}

                      {/* Share icons */}
                      <div className="flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-4">
                        <span className="mr-1 text-xs uppercase tracking-[0.2em] text-white/40">
                          Share
                        </span>

                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          aria-label={`Share "${item.q}" on Facebook`}
                          title="Share on Facebook"
                          onClick={() => shareTo("facebook", index)}
                          className={SHARE_BUTTON}
                        >
                          <BrandIcon name="facebook" />
                        </button>

                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          aria-label={`Share "${item.q}" on X`}
                          title="Share on X"
                          onClick={() => shareTo("x", index)}
                          className={SHARE_BUTTON}
                        >
                          <BrandIcon name="x" />
                        </button>

                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          aria-label={`Share "${item.q}" on LinkedIn`}
                          title="Share on LinkedIn"
                          onClick={() => shareTo("linkedin", index)}
                          className={SHARE_BUTTON}
                        >
                          <BrandIcon name="linkedin" />
                        </button>

                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          aria-label={`Copy link to "${item.q}"`}
                          title="Copy link"
                          onClick={() => copyLink(index)}
                          className={`${SHARE_BUTTON} ${
                            copied ? "border-[#7ecd07] bg-[#7ecd07]/10 text-[#7ecd07]" : ""
                          }`}
                        >
                          {copied ? <Check size={16} /> : <Link2 size={16} />}
                        </button>

                        <span
                          role="status"
                          aria-live="polite"
                          className="text-xs text-[#7ecd07]"
                        >
                          {copied ? "Link copied" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/60 sm:text-base">
            Still have questions? We are happy to help.
          </p>

          <a
            href="/contact"
            className="group mt-5 inline-flex items-center gap-3 rounded-full bg-[#7ecd07] px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#7ecd07] hover:shadow-[0_0_25px_rgba(139,203,61,0.2)]"
          >
            Contact Us
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}