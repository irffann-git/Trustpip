"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GooeyNav from "../GooeyNav";

const items = [
  { label: "Home", href: "/" },
  { label: "Term & Conditions", href: "/term&conditions" },
  { label: "Privacy Policy", href: "/privacyPolicy" },
  { label: "Services", href: "/" },
  { label: "Contact", href: "/contact" },
];

const GLASS =
  "backdrop-blur-[20px] backdrop-saturate-[1.6] [background:rgba(38,35,46,0.66)] [box-shadow:0_22px_44px_-20px_rgba(0,0,0,0.8),0_6px_16px_-8px_rgba(0,0,0,0.5)]";

const RIM =
  "pointer-events-none absolute inset-0 rounded-[inherit] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.07)]";

// Stacks GooeyNav vertically and makes every row full width (mobile menu only)
const VERTICAL_NAV =
  "w-full [&>div]:w-full [&_ul]:flex-col [&_ul]:flex-nowrap [&_li]:w-full [&_li>*]:w-full [&_li>*]:justify-start";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  // Keep the active pill in sync with the current route
  const activeIndex = Math.max(
    0,
    items.findIndex((item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
  );

  // No href is passed to GooeyNav, so it renders buttons and the gooey
  // animation isn't interrupted by a full page reload. Navigation is
  // handled here with the Next.js router instead.
  const navItems = items.map(({ label }) => ({ label }));

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Clear any pending close timer on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Mobile: navigate now, close the menu after the gooey animation has played
  const handleMobileChange = (index) => {
    router.push(items[index].href);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 650);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
        {/* One rounded box holding logo + navigation */}
        <div
          className={`relative flex w-full max-w-full items-center justify-between rounded-full px-4 py-2 sm:px-6 lg:w-auto lg:justify-center lg:gap-8 lg:px-8 xl:gap-15 xl:px-20 ${GLASS}`}
        >
          {/* Inner rim, same as the GooeyNav frame */}
          <span aria-hidden="true" className={RIM} />

          {/* TrustPip Logo */}
          <Link
            href="/"
            aria-label="TrustPip home"
            className="flex shrink-0 items-center gap-2 py-[4px] lg:px-4"
          >
            <Image
              src="/images/trustPip_Logo.png"
              alt="TrustPip Logo"
              width={44}
              height={44}
              priority
              className="h-8 w-8 object-contain sm:h-10 sm:w-10"
            />

            <span className="whitespace-nowrap text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
              Trust<span className="text-[#7ecd07]">Pip</span>
            </span>
          </Link>

          {/* Gooey Navigation (desktop only) */}
          <div aria-label="Main navigation" className="hidden min-w-0 lg:block">
            <GooeyNav
              items={navItems}
              activeIndex={activeIndex}
              onChange={(index) => router.push(items[index].href)}
              theme="dark"
              color="#7ecd07"
              size="md"
              frame={false}
              particleCount={15}
              spread={56}
              animationTime={600}
              timeVariance={300}
              gooeyness={0.5}
              wobble={0.5}
              hoverEffect
            />
          </div>

          {/* Hamburger (mobile + tablet only) */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Dropdown menu (mobile + tablet only) with the gooey effect */}
        {open && (
          <div
            id="mobile-menu"
            className={`absolute inset-x-0 top-full mt-3 rounded-3xl p-2 lg:hidden ${GLASS}`}
          >
            <span aria-hidden="true" className={RIM} />
            <GooeyNav
              items={navItems}
              activeIndex={activeIndex}
              onChange={handleMobileChange}
              theme="dark"
              color="#7ecd07"
              size="md"
              frame={false}
              className={VERTICAL_NAV}
              particleCount={15}
              spread={56}
              animationTime={600}
              timeVariance={300}
              gooeyness={0.5}
              wobble={0.5}
              hoverEffect
            />
          </div>
        )}
      </div>
    </header>
  );
}