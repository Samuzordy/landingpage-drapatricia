"use client";

import { useEffect, useRef } from "react";

/**
 * Client island for Card: writes the cursor position into --mx / --my on its parent element,
 * so the radial glow follows the pointer. Renders an empty, hidden span; fine pointers only.
 * Keeping it separate lets Card itself stay a Server Component.
 */
export function PointerGlow() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        host.style.setProperty("--mx", `${e.clientX - r.left}px`);
        host.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} hidden />;
}
