"use client";

import { useEffect, useState } from "react";
import { ServiceCardsView, type ServiceCardData } from "./ServiceCardsView";

/** Row layout breakpoint — 4+ areas need more width per column (see .services-grid). */
const wideQuery = (count: number) => `(min-width: ${count > 3 ? 1280 : 1024}px)`;
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Expanding service cards — interactive island, lazy-loaded by ServicesIsland.
 * - ≥ 1024px (≥ 1280px with 4+ areas): one column per area; the active card grows 1fr → 1.6fr while the others shrink,
 *   and its services enter with a 60ms stagger. Hover (fine pointer) or keyboard focus activates a card;
 *   one card is always open.
 * - Below that / touch: accordion — tapping opens one area and collapses the others.
 * Each card is a disclosure (button + aria-expanded + region), so nothing depends on hover.
 * Reduced motion: no width/zoom/stagger movement, only the color/opacity changes remain.
 */
export function ServiceCards({ services }: { services: ServiceCardData[] }) {
  const [active, setActive] = useState<number | null>(0);
  const [wide, setWide] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const wideMq = window.matchMedia(wideQuery(services.length));
    const fineMq = window.matchMedia(FINE_POINTER);
    const sync = () => {
      setWide(wideMq.matches);
      setFine(fineMq.matches);
      // In the row layout one card is always expanded.
      if (wideMq.matches) setActive((current) => current ?? 0);
    };
    sync();
    wideMq.addEventListener("change", sync);
    fineMq.addEventListener("change", sync);
    return () => {
      wideMq.removeEventListener("change", sync);
      fineMq.removeEventListener("change", sync);
    };
  }, [services.length]);

  return (
    <ServiceCardsView
      services={services}
      active={active}
      handlers={{
        onTrigger: (i) => setActive((current) => (current === i && !wide ? null : i)),
        onTriggerFocus: (i, e) => {
          if (wide && e.currentTarget.matches(":focus-visible")) setActive(i);
        },
        onCardPointerEnter: (i, e) => {
          if (e.pointerType === "mouse" && fine && wide) setActive(i);
        },
      }}
    />
  );
}
