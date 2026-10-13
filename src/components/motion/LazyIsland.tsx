"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

type LazyIslandProps<P extends object> = {
  /** Stable loader (defined at module level), e.g. () => import("./X").then((m) => m.X). */
  load: () => Promise<ComponentType<P>>;
  props: P;
  /** Static, server-rendered markup identical to the interactive component's first render. */
  children: ReactNode;
  rootMargin?: string;
  className?: string;
};

const FOCUSABLE = "a[href], button:not([disabled]), input, select, textarea, [tabindex]";

/**
 * Below-the-fold interactive islands without upfront JS (CLAUDE.md, interaction rule 4):
 * the server renders the static markup; the interactive chunk is imported only when the island
 * gets close to the viewport (or on first pointer/focus inside it), then swapped in.
 * Same markup on both sides → no layout shift; focus inside is preserved across the swap.
 */
export function LazyIsland<P extends object>({
  load,
  props,
  children,
  rootMargin = "600px 0px",
  className,
}: LazyIslandProps<P>) {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    let cancelled = false;

    const start = () => {
      if (started) return;
      started = true;
      cleanup();
      load().then((Loaded) => {
        if (cancelled) return;
        const focusables = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)];
        const index = focusables.indexOf(document.activeElement as HTMLElement);
        focusIndex.current = index >= 0 ? index : null;
        setComponent(() => Loaded);
      });
    };
    const io = new IntersectionObserver(([entry]) => entry?.isIntersecting && start(), {
      rootMargin,
    });
    const cleanup = () => {
      io.disconnect();
      el.removeEventListener("pointerenter", start);
      el.removeEventListener("focusin", start);
    };

    io.observe(el);
    el.addEventListener("pointerenter", start);
    el.addEventListener("focusin", start);
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [load, rootMargin]);

  useLayoutEffect(() => {
    if (!Component || focusIndex.current === null) return;
    ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[focusIndex.current]?.focus({
      preventScroll: true,
    });
    focusIndex.current = null;
  }, [Component]);

  return (
    <div ref={ref} className={className} data-island={Component ? "interactive" : "static"}>
      {Component ? <Component {...props} /> : children}
    </div>
  );
}
