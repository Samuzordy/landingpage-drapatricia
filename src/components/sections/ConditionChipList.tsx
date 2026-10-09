import type { CSSProperties, MouseEvent } from "react";
import { Chip } from "@/components/ui/Chip";

export type ConditionItem = {
  nome: string;
  /** Short "quando procurar" text (≤ 140 chars) — or the provisional notice. */
  hint: string;
  hintPending: boolean;
  pillar: string;
};

/**
 * Pure markup for the condition chips — no hooks, no "use client". Rendered on the server as
 * the static state and reused by the interactive ConditionChips island (same markup, no shift).
 */
export function ConditionChipList({
  conditions,
  withHints = false,
  onSelect,
}: {
  conditions: ConditionItem[];
  /** Attach the hover/focus Tooltip (fine pointers only). */
  withHints?: boolean;
  onSelect?: (index: number, e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Condições">
      {conditions.map((condition, i) => (
        <li key={condition.nome} style={{ "--i": i } as CSSProperties}>
          <Chip
            hint={withHints ? condition.hint : undefined}
            aria-haspopup="dialog"
            onClick={onSelect ? (e) => onSelect(i, e) : undefined}
            className="text-[0.9375rem]"
          >
            {condition.nome}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
