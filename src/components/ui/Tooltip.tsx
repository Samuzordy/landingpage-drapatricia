"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export type TooltipProps = {
  content: ReactNode;
  /** A single focusable element (button, link). It receives aria-describedby. */
  children: ReactElement<{ "aria-describedby"?: string }>;
  placement?: "top" | "bottom";
  className?: string;
};

const VIEWPORT_GUTTER = 12;

/**
 * Short supplementary hint (WCAG 1.4.13: dismissible, hoverable, persistent).
 * - mouse: opens on hover (fine pointers only), stays open while hovering the bubble;
 * - keyboard: opens on focus, closes on blur or Escape;
 * - touch: tap toggles, tapping outside closes.
 * The text is always exposed to assistive tech via aria-describedby, so hover is never the
 * only way to reach it. Client Component: needs Escape/outside-tap handling and edge clamping.
 */
export function Tooltip({ content, children, placement = "top", className = "" }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Keep the bubble inside the viewport (360px screens).
  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    bubble.style.setProperty("--shift", "0px");
    if (!open) return;
    const r = bubble.getBoundingClientRect();
    const maxRight = window.innerWidth - VIEWPORT_GUTTER;
    let shift = 0;
    if (r.left < VIEWPORT_GUTTER) shift = VIEWPORT_GUTTER - r.left;
    else if (r.right > maxRight) shift = maxRight - r.right;
    bubble.style.setProperty("--shift", `${shift}px`);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onOutside = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open, close]);

  const fineHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const trigger = isValidElement(children)
    ? cloneElement(children, { "aria-describedby": id })
    : children;

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-flex ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && fineHover() && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && close()}
      onPointerUp={(e) => {
        if (e.pointerType === "mouse") return;
        if (bubbleRef.current?.contains(e.target as Node)) return;
        setOpen((v) => !v);
      }}
      onFocus={(e) => {
        // Only keyboard focus opens it; a tap already toggles via pointerup.
        if ((e.target as HTMLElement).matches(":focus-visible")) setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {trigger}
      <span
        ref={bubbleRef}
        id={id}
        role="tooltip"
        data-open={open || undefined}
        data-placement={placement}
        className="tooltip pointer-events-none absolute left-1/2 z-40 w-max max-w-[min(18rem,calc(100vw-24px))] rounded-2xl bg-cacau px-3.5 py-2.5 text-left text-sm leading-snug font-normal text-porcelana normal-case shadow-warm data-open:pointer-events-auto"
      >
        {content}
      </span>
    </span>
  );
}
