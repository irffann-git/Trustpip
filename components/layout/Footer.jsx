"use client";

import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { ArrowUpRight } from "lucide-react";

// Footer navigation links
const footerLinks = [
  { label: "Accessibility", href: "/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping Policy", href: "/" },
  { label: "Refund Policy", href: "/" },
];

// Social media links
// Replace these URLs with TrustPip's actual profiles.
const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: FaYoutube,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#86c923]/20 bg-[#080908] text-white">

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/2 -z-10 h-56 w-[70%] -translate-x-1/2 rounded-full bg-[#86c923]/[0.08] blur-[100px]"
      />

      {/* Top green accent line */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#86c923]/70 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">

        {/* Policy navigation */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-5 lg:gap-x-8"
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-xs font-medium text-white/65 transition-all duration-300 hover:border-[#86c923]/20 hover:bg-[#86c923]/[0.06] hover:text-[#a9d96d] sm:text-sm"
            >
              {link.label}

              <ArrowUpRight
                size={13}
                className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-auto my-7 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-8" />

        {/* Social media icons */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-[#86c923]/50 hover:bg-[#86c923] hover:text-black hover:shadow-[0_0_20px_rgba(134,201,35,0.18)]"
              >
                <Icon
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            );
          })}
        </div>

     

      </div>

      {/* Bottom accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#86c923]/40 to-transparent" />
    </footer>
  );
}