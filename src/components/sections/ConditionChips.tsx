"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { PendingTag } from "@/components/ui/PendingTag";
import { ConditionChipList, type ConditionChipItem } from "./ConditionChipList";

export type ConditionChipsProps = {
  items: ConditionChipItem[];
  listLabel: string;
  labels: { sheetKicker: string; related: string; disclaimer: string };
  /** Anchor of the services section, or null when it's disabled (no link). */
  relatedHref: string | null;
  whatsapp: { label: string; href: string | null; pendingNote: string };
  showPendingMarkers: boolean;
};

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * "Quando procurar" chips — interactive island, lazy-loaded by WhenToSeekIsland.
 * - fine pointer: hover or keyboard focus shows the short hint in a Tooltip (180ms fill);
 * - any device: activating a chip (click, tap, Enter/Space) opens the bottom sheet with the
 *   same text, the related service area and the WhatsApp CTA — the touch equivalent.
 * The Tooltip is only attached for fine pointers, so a tap never shows both.
 */
export function ConditionChips({
  items,
  listLabel,
  labels,
  relatedHref,
  whatsapp,
  showPendingMarkers,
}: ConditionChipsProps) {
  const [fine, setFine] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const noteId = useId();

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <>
      <ConditionChipList
        items={items}
        listLabel={listLabel}
        withHints={fine}
        onSelect={(i, e) => {
          triggerRef.current = e.currentTarget;
          setOpenIndex(i);
        }}
      />

      <BottomSheet
        open={current !== null}
        onClose={() => setOpenIndex(null)}
        kicker={labels.sheetKicker}
        title={current?.name}
        returnFocusRef={triggerRef}
      >
        {current && (
          <>
            <p className="measure text-[1.0625rem] text-cacau/90">
              {current.hint}
              {current.hintPending && showPendingMarkers && <PendingTag label="texto pendente" />}
            </p>
            {current.related && (
              <p className="mt-4 text-sm text-cacau/80">
                {labels.related}:{" "}
                {relatedHref ? (
                  <a
                    href={relatedHref}
                    onClick={() => setOpenIndex(null)}
                    className="font-semibold text-terracota-texto underline decoration-rose underline-offset-4"
                  >
                    {current.related}
                  </a>
                ) : (
                  <span className="font-semibold text-cacau">{current.related}</span>
                )}
              </p>
            )}
            <div className="mt-6">
              {whatsapp.href ? (
                <Button href={whatsapp.href} external arrow className="w-full sm:w-auto">
                  {whatsapp.label}
                </Button>
              ) : (
                <>
                  <Button pending aria-describedby={noteId} arrow className="w-full sm:w-auto">
                    {whatsapp.label}
                  </Button>
                  <p id={noteId} className="mt-2 text-sm text-cacau/80">
                    {whatsapp.pendingNote}
                  </p>
                </>
              )}
            </div>
            <p className="mt-6 border-t border-areia pt-4 text-xs text-cacau/75">
              {labels.disclaimer}
            </p>
          </>
        )}
      </BottomSheet>
    </>
  );
}
