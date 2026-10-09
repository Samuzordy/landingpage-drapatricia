"use client";

import { useEffect, useState } from "react";
import { PillarCardsView, type PillarCardData } from "./PillarCardsView";

const WIDE = "(min-width: 1024px)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Expanding pillar cards (spec section 07) — interactive island, lazy-loaded by PillarsIsland.
 * - ≥ 1024px: three columns; the active card grows 1fr → 1.6fr while the others shrink, and its
 *   services enter with a 60ms stagger. Hover (fine pointer) or keyboard focus activates a card;
 *   one card is always open.
 * - < 1024px / touch: accordion — tapping opens one pillar and collapses the others.
 * Each card is a disclosure (button + aria-expanded + region), so nothing depends on hover.
 * Reduced motion: no width/zoom/stagger movement, only the color/opacity changes remain.
 */
export function PillarCards({ pillars }: { pillars: PillarCardData[] }) {
  const [active, setActive] = useState<number | null>(0);
  const [wide, setWide] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const wideMq = window.matchMedia(WIDE);
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
  }, []);

  return (
    <PillarCardsView
      pillars={pillars}
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
