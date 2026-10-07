"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { ButtonContent, buttonClasses, type ButtonProps } from "./Button";

/** Max displacement toward the cursor (spec: "desloca até 6 px"). */
const MAX_PULL = 6;

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * CTA with the spec's desktop/touch behaviors:
 * - fine pointer: magnetic pull (≤ 6px) and circular fill starting where the cursor entered;
 * - touch: press scale .97 (CSS) and a ripple from the touch point;
 * - reduced motion: no pull, no ripple; the fill only fades (opacity).
 * Client Component because it reads pointer position.
 */
export function MagneticButton(props: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const caps = useRef({ magnetic: false, motion: true });
  const frame = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia(FINE_POINTER);
    const reduce = window.matchMedia(REDUCED_MOTION);
    const sync = () => {
      caps.current = { magnetic: fine.matches && !reduce.matches, motion: !reduce.matches };
    };
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const setVar = (name: string, value: string) => ref.current?.style.setProperty(name, value);

  const onPointerEnter = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    setVar("--fx", `${e.clientX - r.left}px`);
    setVar("--fy", `${e.clientY - r.top}px`);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || !caps.current.magnetic || e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const dx = (clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (clientY - (r.top + r.height / 2)) / (r.height / 2);
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      el.style.translate = `${clamp(dx) * MAX_PULL}px ${clamp(dy) * MAX_PULL}px`;
    });
  };

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.translate = "";
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "mouse" || !caps.current.motion) return;
    if (el.getAttribute("aria-disabled") === "true") return;
    const r = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.left = `${e.clientX - r.left}px`;
    ripple.style.top = `${e.clientY - r.top}px`;
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    el.appendChild(ripple);
  };

  const handlers = { onPointerEnter, onPointerMove, onPointerLeave, onPointerDown };

  if (props.href !== undefined) {
    const { variant, size, arrow, children, className, external, disabled, href, ...rest } = props;
    return (
      <a
        {...rest}
        {...handlers}
        ref={(node) => {
          ref.current = node;
        }}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        target={external ? "_blank" : rest.target}
        rel={external ? "noopener noreferrer" : rest.rel}
        className={buttonClasses({ variant, size, className: `btn-magnetic ${className ?? ""}` })}
      >
        <ButtonContent arrow={arrow}>{children}</ButtonContent>
      </a>
    );
  }

  const { variant, size, arrow, children, className, type = "button", disabled, ...rest } = props;
  return (
    <button
      {...rest}
      {...handlers}
      ref={(node) => {
        ref.current = node;
      }}
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={buttonClasses({ variant, size, className: `btn-magnetic ${className ?? ""}` })}
    >
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}
