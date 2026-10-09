"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CroppedImage } from "@/components/ui/CroppedImage";
import type { ImageAsset } from "@/types/content";

export type DermatoscopeLensProps = {
  /** Visible surface (portrait or texture). */
  base: ImageAsset;
  /** "Microscopic" layer revealed inside the lens. */
  detail: ImageAsset;
  label?: string;
  /** Base image is the hero LCP candidate. */
  priority?: boolean;
  /** Frame sizes (also used by the detail layer). */
  sizes?: string;
  /** Frame aspect ratio (width / height). The layout keeps it whatever the photo is. */
  aspect?: number;
  className?: string;
};

const LERP = 0.12; // inertia (spec section 07)
const TOUR_MS = 6000; // automatic path on touch devices
const SETTLE_PX = 0.15;
/** Fixed position (fraction of the frame) for the static, reduced-motion lens. */
const STATIC_POS = { x: 0.6, y: 0.42 };

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type LensMode = "idle" | "active" | "tour" | "static";

/**
 * Hero "Lente Dermatoscópica" (spec sections 04, 07, 08).
 * - Fine pointer: a 160px lens follows the cursor with lerp 0.12, revealing `detail` through
 *   clip-path: circle(80px at var(--lx) var(--ly)); thin terracota ring + "aumento 10x".
 * - Touch: no hover needed — when the frame is ≥ 60% visible the lens runs a slow 6s path once,
 *   then fades out. Purely visual (pointer-events: none), never blocks scrolling or taps.
 * - Reduced motion: no tracking, no tour; the lens is shown still at a fixed spot.
 * requestAnimationFrame runs only while the lens is moving; everything is cleaned on unmount.
 */
export function DermatoscopeLens({
  base,
  detail,
  label = "aumento 10x",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  aspect = 4 / 5,
  className = "",
}: DermatoscopeLensProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;

    const setMode = (mode: LensMode) => {
      el.dataset.lens = mode;
    };
    const apply = () => {
      el.style.setProperty("--lx", `${pos.x}px`);
      el.style.setProperty("--ly", `${pos.y}px`);
    };

    // ----- Reduced motion: static lens -----
    if (window.matchMedia(REDUCED_MOTION).matches) {
      const place = () => {
        const r = el.getBoundingClientRect();
        pos.x = r.width * STATIC_POS.x;
        pos.y = r.height * STATIC_POS.y;
        apply();
      };
      place();
      setMode("static");
      const ro = new ResizeObserver(place);
      ro.observe(el);
      return () => ro.disconnect();
    }

    // ----- Touch / coarse pointer: one automatic tour when visible -----
    if (!window.matchMedia(FINE_POINTER).matches) {
      let start = 0;
      const tour = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / TOUR_MS, 1);
        const r = el.getBoundingClientRect();
        const a = t * Math.PI * 2;
        // Gentle Lissajous path around the center of the frame.
        pos.x = r.width * (0.5 + 0.26 * Math.sin(a));
        pos.y = r.height * (0.45 + 0.18 * Math.sin(a * 2 + 0.6));
        apply();
        if (t < 1) frame = requestAnimationFrame(tour);
        else {
          frame = 0;
          setMode("idle"); // "se recolhe"
        }
      };
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          setMode("tour");
          frame = requestAnimationFrame(tour);
        },
        { threshold: 0.6 },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(frame);
      };
    }

    // ----- Fine pointer: follow the cursor with inertia -----
    const tick = () => {
      pos.x += (pos.tx - pos.x) * LERP;
      pos.y += (pos.ty - pos.y) * LERP;
      apply();
      const moving = Math.abs(pos.tx - pos.x) > SETTLE_PX || Math.abs(pos.ty - pos.y) > SETTLE_PX;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const target = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pos.tx = e.clientX - r.left;
      pos.ty = e.clientY - r.top;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target(e);
      // Start where the cursor enters instead of flying in from a corner.
      pos.x = pos.tx;
      pos.y = pos.ty;
      apply();
      setMode("active");
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target(e);
      if (el.dataset.lens !== "active") setMode("active");
      run();
    };
    const onLeave = () => setMode("idle");

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const isSvg = (src: string) => src.endsWith(".svg");

  return (
    <div
      ref={rootRef}
      data-lens="idle"
      className={`lens relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <CroppedImage asset={base} frameAspect={aspect} sizes={sizes} priority={priority} />
      <div aria-hidden="true" className="lens-detail absolute inset-0">
        <Image
          src={detail.src}
          alt=""
          fill
          sizes={sizes}
          unoptimized={isSvg(detail.src)}
          className="object-cover"
        />
      </div>
      <div aria-hidden="true" className="lens-ring">
        <span className="lens-label">{label}</span>
      </div>
    </div>
  );
}
