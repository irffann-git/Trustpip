"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const toTop = () =>
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

function AutoScrollToTop() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // On load / refresh: let the browser restore its position, then glide to the top
  useEffect(() => {
    if (window.location.hash) return; // let #anchor links work normally
    const t = setTimeout(toTop, 150);
    return () => clearTimeout(t);
  }, []);

  // On every route change: smooth scroll to the top
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // the load effect above already handles this
      return;
    }
    if (window.location.hash) return;
    toTop();
  }, [pathname]);

  return null;
}

export default AutoScrollToTop;