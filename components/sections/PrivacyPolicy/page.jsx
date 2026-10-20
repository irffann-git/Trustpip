"use client";

import React from "react";

const privacySections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect personal data to deliver secure authentication, real-time trading signals, and course curriculum.",
    points: [
      {
        label: "Account Details",
        text: "Name, email address, profile avatar, and encrypted passwords (BCrypt).",
      },
      {
        label: "Google Sign-In",
        text: "Name, verified email address, and Google profile picture.",
      },
      {
        label: "Push Notification Identifiers",
        text: "Firebase Cloud Messaging (FCM) device tokens.",
      },
      {
        label: "Device Identifiers",
        text: "A device identifier provided by your operating system (Android ID on Android, identifierForVendor on iOS).",
      },
      {
        label: "Subscriptions",
        text: "Active plan tier and purchase transaction records.",
      },
    ],
  },
  {
    title: "2. How We Use Data",
    points: [
      {
        text: "Authenticating user accounts and managing sessions.",
      },
      {
        text: "Delivering algorithmic signals and notifications.",
      },
      {
        text: "Verifying subscription and course entitlements.",
      },
      {
        text: "Sending transactional security verification OTP codes.",
      },
      {
        text: "Limiting free trials and free offers to one claim per device.",
      },
    ],
  },
  {
    title: "3. Device Identifiers",
    content:
      "We read the device identifier your operating system provides so that a free trial or free access period can be limited to one claim per device. Without it, the same free offer could be claimed repeatedly from new accounts on the same handset.",
    extra:
      "This identifier is used only for that check and for delivering push notifications to the right device. It is not used for advertising, not combined with data from other apps, and not shared with advertisers or data brokers.",
  },
  {
    title: "4. Payments",
    content:
      "Payments are processed by Razorpay, a payment gateway regulated by the Reserve Bank of India.",
    extra:
      "We never receive, see or store your card number, CVV, UPI PIN or banking credentials. Those are entered directly with Razorpay and handled entirely on their systems. What we store is limited to the record of the transaction: which plan or course was bought, the amount, the currency, the status, and Razorpay's reference identifiers, so we can grant your access and support you if something goes wrong.",
    extraTwo:
      "If you set up UPI Autopay, the mandate is held by Razorpay and your bank. You can cancel it at any time, and cancelling stops all future charges.",
    link: {
      label: "Razorpay Privacy Policy",
      href: "https://razorpay.com/privacy/",
    },
  },
  {
    title: "5. Third-Party Services",
    content:
      "We use Google Play Services, Google Sign-In, Firebase Cloud Messaging, Google SMTP, Bunny.net for video delivery, and Razorpay for payments. We do not sell or monetize personal data with advertisers.",
  },
  {
    title: "6. Security",
    points: [
      {
        text: "Data in transit is encrypted using HTTPS/TLS.",
      },
      {
        text: "Passwords are cryptographically hashed using BCrypt.",
      },
      {
        text: "Access to signals and course content is verified on our servers on every request, not in the app.",
      },
    ],
  },
  {
    title: "7. Account & Data Deletion",
    content:
      "Users may request account and data deletion at any time via Profile Settings in the app or by emailing us. Transaction records may be retained where we are required to keep them for tax or regulatory purposes.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "TRUSTPIP is designed for individuals aged 18 and older.",
  },
  {
    title: "9. Contact",
    content:
      "For any privacy question, data request or complaint, email us. We aim to acknowledge within 24 hours and resolve within 15 days.",
  },
];

function PrivacySection({ section }) {
  return (
    <article className="group">
      <h2 className="mb-3 text-base font-semibold text-[#86c923] sm:text-lg">
        {section.title}
      </h2>

      {section.content && (
        <p className="text-sm leading-7 text-white/75 sm:text-base">
          {section.content}
        </p>
      )}

      {section.points && (
        <ul className="mt-3 space-y-3">
          {section.points.map((point, index) => (
            <li
              key={`${section.title}-${index}`}
              className="flex items-start gap-3 text-sm leading-7 text-white/75 sm:text-base"
            >
              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#86c923]" />

              <span>
                {point.label && (
                  <strong className="font-semibold text-white">
                    {point.label}:{" "}
                  </strong>
                )}
                {point.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {section.extra && (
        <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
          {section.extra}
        </p>
      )}

      {section.extraTwo && (
        <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
          {section.extraTwo}
        </p>
      )}

      {section.link && (
        <a
          href={section.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#86c923] underline decoration-[#86c923]/40 underline-offset-4 transition-colors hover:text-white"
        >
          {section.link.label}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

export default function PrivacyPolicy() {
  return (
    <section
      id="privacy-policy"
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b] px-5 py-16 text-white sm:px-8 md:py-20"
    >
 
      {/* Subtle green background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#86c923]/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#86c923] sm:text-sm">
            Your Data. Your Privacy.
          </p>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Privacy Policy
            <span className="mt-2 block text-xl font-semibold text-[#86c923] sm:inline sm:text-3xl">
              {" "}
              for TRUSTPIP
            </span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#86c923]" />
        </div>

        {/* Policy content */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.025] p-5 shadow-[0_0_60px_rgba(134,201,35,0.04)] sm:p-8 md:p-10">
          {/* Policy details */}
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

          {/* Policy sections */}
          <div className="space-y-8">
            {privacySections.map((section) => (
              <PrivacySection key={section.title} section={section} />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-10 rounded-xl border border-[#86c923]/20 bg-[#86c923]/[0.05] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-white sm:text-lg">
              Have a privacy question?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Contact our team for privacy questions, data requests, or
              complaints.
            </p>

            <a
              href="mailto:info.trustpip@gmail.com"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#86c923] px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white"
            >
              Contact TRUSTPIP
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/35 sm:text-sm">
          © 2026 TRUSTPIP. All rights reserved.
        </p>
      </div>
    </section>
  );
}