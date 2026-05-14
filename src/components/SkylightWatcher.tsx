"use client";

import { useEffect } from "react";

// Distance from page bottom (in px) at which the html bg flips to paper,
// so the bottom-edge overscroll bounce reveals paper instead of sage.
const BOTTOM_THRESHOLD = 400;

export function SkylightWatcher() {
  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      const nearBottom = distanceFromBottom < BOTTOM_THRESHOLD;
      html.style.setProperty(
        "--skylight",
        nearBottom ? "var(--paper)" : "var(--skylight-top)",
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
