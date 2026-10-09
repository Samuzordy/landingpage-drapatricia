"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { ConditionChipList, type ConditionItem } from "./ConditionChipList";

export type ConditionChipsProps = {
  conditions: ConditionItem[];
  whatsapp: { label: string; href: string | null; pendingNote: string };
  showPendingMarkers: boolean;
};

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Condition chips (spec section 07) — interactive island, lazy-loaded by ConditionsIsland.
 * - fine pointer: hover or keyboard focus shows the short hint in a Tooltip (180ms fill);
 * - any device: activating a chip (click, tap, Enter/Space) opens the bottom sheet with the
 *   same text, the related pillar and the WhatsApp CTA — the spec's touch equivalent.
 * The Tooltip is only attached for fine pointers, so a tap never shows both.
 */
export function ConditionChips({ conditions, whatsapp, showPendingMarkers }: ConditionChipsProps) {
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

  const current = openIndex === null ? null : conditions[openIndex];

  return (
    <>
      <ConditionChipList
        conditions={conditions}
        withHints={fine}
        onSelect={(i, e) => {
          triggerRef.current = e.currentTarget;
          setOpenIndex(i);
        }}
      />

      <BottomSheet
        open={current !== null}
        onClose={() => setOpenIndex(null)}
        kicker="Quando procurar"
        title={current?.nome}
        returnFocusRef={triggerRef}
      >
        {current && (
          <>
            <p className="measure text-[1.0625rem] text-cacau/90">
              {current.hint}
              {current.hintPending && showPendingMarkers && (
                <span className="ml-2 inline-flex items-center rounded-pill border border-dashed border-rose px-2 py-0.5 align-middle text-[0.6875rem] font-medium text-cacau/80">
                  texto pendente
                </span>
              )}
            </p>
            {current.pillar && (
              <p className="mt-4 text-sm text-cacau/80">
                Pilar relacionado:{" "}
                <a
                  href="#tratamentos"
                  onClick={() => setOpenIndex(null)}
                  className="font-semibold text-terracota-texto underline decoration-rose underline-offset-4"
                >
                  {current.pillar}
                </a>
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
              Informação geral, de caráter educativo. Não substitui a avaliação médica.
            </p>
          </>
        )}
      </BottomSheet>
    </>
  );
}
