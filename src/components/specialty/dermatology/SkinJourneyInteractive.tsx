"use client";

import { useEffect, useRef, useState } from "react";
import type { SkinLayerId } from "./content";
import { SkinJourneyView, type JourneyLabels, type JourneyLayer } from "./SkinJourneyView";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export type SkinJourneyInteractiveProps = {
  layers: JourneyLayer[];
  labels: JourneyLabels;
  showPendingMarkers: boolean;
};

/**
 * Interactive Jornada da Pele — lazy-loaded by SkinJourneyIsland.
 * - fine pointer: hovering a layer of the cross-section selects it;
 * - everyone: the depth gauge is a WAI-ARIA tablist — click/tap selects; arrows (all four),
 *   Home and End move between layers with automatic activation; focus is always visible;
 * - the active layer lifts 4px with extra saturation, the others drop to 40%; the panel swaps
 *   with fade + 12px slide. Reduced motion keeps only the opacity/colour change.
 */
export function SkinJourneyInteractive({
  layers,
  labels,
  showPendingMarkers,
}: SkinJourneyInteractiveProps) {
  const [active, setActive] = useState<SkinLayerId>(layers[0]?.id ?? "epiderme");
  const fine = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const sync = () => {
      fine.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <SkinJourneyView
      layers={layers}
      labels={labels}
      active={active}
      showPendingMarkers={showPendingMarkers}
      handlers={{
        onSelect: setActive,
        onLayerPointerEnter: (id, e) => {
          if (e.pointerType === "mouse" && fine.current) setActive(id);
        },
        onTabKeyDown: (index, e) => {
          const last = layers.length - 1;
          const next: Record<string, number> = {
            ArrowDown: Math.min(index + 1, last),
            ArrowRight: Math.min(index + 1, last),
            ArrowUp: Math.max(index - 1, 0),
            ArrowLeft: Math.max(index - 1, 0),
            Home: 0,
            End: last,
          };
          const target = next[e.key];
          if (target === undefined) return;
          e.preventDefault();
          const layer = layers[target];
          if (!layer) return;
          setActive(layer.id);
          document.getElementById(`jornada-tab-${layer.id}`)?.focus();
        },
      }}
    />
  );
}
