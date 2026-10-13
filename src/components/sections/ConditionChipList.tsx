import type { CSSProperties, MouseEvent } from "react";
import { Chip } from "@/components/ui/Chip";

export type ConditionChipItem = {
  name: string;
  /** Short "quando procurar" text (≤ 140 chars) — or the provisional notice. */
  hint: string;
  hintPending: boolean;
  /** Title of the related service area ("" when none). */
  related: string;
};

/**
 * Pure markup for the "quando procurar" chips — no hooks, no "use client". Rendered on the
 * server as the static state and reused by the interactive ConditionChips island (same markup,
 * no shift).
 */
export function ConditionChipList({
  items,
  listLabel,
  withHints = false,
  onSelect,
}: {
  items: ConditionChipItem[];
  listLabel: string;
  /** Attach the hover/focus Tooltip (fine pointers only). */
  withHints?: boolean;
  onSelect?: (index: number, e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label={listLabel}>
      {items.map((item, i) => (
        <li key={item.name} style={{ "--i": i } as CSSProperties}>
          <Chip
            hint={withHints ? item.hint : undefined}
            aria-haspopup="dialog"
            onClick={onSelect ? (e) => onSelect(i, e) : undefined}
            className="text-[0.9375rem]"
          >
            {item.name}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
