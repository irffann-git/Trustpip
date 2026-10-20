"use client";

import React from "react";

const terms = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By downloading, registering, or using TRUSTPIP, you agree to comply with these Terms & Conditions and our Privacy Policy.",
  },
  {
    title: "2. Financial Risk & Educational Disclaimer",
    content:
      "IMPORTANT: Trading foreign exchange (Forex), commodities, and financial derivatives carries a high level of risk of capital loss. All signals, lessons, analyses, and materials in TRUSTPIP are provided strictly for educational and informational purposes only and do NOT constitute financial or investment advice.",
  },
  {
    title: "3. Eligibility & Accounts",
    content:
      "You must be at least 18 years old to use TRUSTPIP. You are responsible for keeping your credentials and OTP codes confidential.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All trade signals, course videos, audio tracks, and branding are the exclusive intellectual property of TRUSTPIP. Unauthorized redistribution is prohibited.",
  },
  {
    title: "5. Subscriptions & Billing",
    content:
      "Subscriptions provide access to premium tiers and auto-renew unless cancelled prior to the end of the billing period.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "TRUSTPIP shall not be liable for any trading losses or financial damages resulting from reliance on signals or app downtime.",
  },
];

export default function TermsAndConditions() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0b] px-5 py-16 mt-20 text-white sm:px-8 md:py-20">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#86c923]/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#86c923] sm:text-sm">
            Legal Information
          </p>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Terms & Conditions
            <span className="mt-2 block text-xl font-semibold text-[#86c923] sm:inline sm:text-3xl">
              {" "}
              for TRUSTPIP
            </span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#86c923]" />
        </div>

        {/* Terms content */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.025] p-5 shadow-[0_0_60px_rgba(134,201,35,0.04)] sm:p-8 md:p-10">
          {/* Contact information */}
          <div className="mb-8 space-y-2 border-b border-white/10 pb-6 text-sm leading-6 text-white/65 sm:text-base">

            <p>
              <span className="font-medium text-white">Developer:</span>{" "}
              TRUSTPIP (com.trustpip.app)
            </p>

            <p className="break-words">
              <span className="font-medium text-white">Contact:</span>{" "}
              <a
                href="mailto:info.trustpip@gmail.com"
                className="transition-colors hover:text-[#86c923]"
              >
                info.trustpip@gmail.com
              </a>
            </p>
          </div>

          {/* Individual terms */}
          <div className="space-y-7">
            {terms.map((term) => (
              <article key={term.title} className="group">
                <h2 className="mb-2 text-base font-semibold text-[#86c923] transition-colors sm:text-lg">
                  {term.title}
                </h2>

                <p className="text-sm leading-7 text-white/75 sm:text-base">
                  {term.content}
                </p>
              </article>
            ))}
          </div>

          {/* Bottom notice */}
          <div className="mt-10 rounded-xl border border-[#86c923]/20 bg-[#86c923]/[0.05] p-4 sm:p-5">
            <p className="text-sm leading-6 text-white/70">
              <span className="font-semibold text-[#86c923]">
                Important Notice:{" "}
              </span>
              Forex trading involves substantial risk. Always understand the
              risks before making financial decisions.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-white/35 sm:text-sm">
          © 2026 TRUSTPIP. All rights reserved.
        </p>
      </div>
    </section>
  );
}