"use client";

import { useEffect } from "react";

const SKYLIGHT_END = 800;

export function SkylightWatcher() {
  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      const past = window.scrollY > SKYLIGHT_END;
      html.style.setProperty(
        "--skylight",
        past ? "var(--paper)" : "oklch(0.985 0.0275 142)",
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return null;
}
