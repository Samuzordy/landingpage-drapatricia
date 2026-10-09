"use client";

import { useId, useRef, useState } from "react";
import { AccordionView, type AccordionItem } from "./AccordionView";

export type { AccordionItem };

export type AccordionProps = {
  items: AccordionItem[];
  /** "single": opening one closes the others (Pillars on mobile). */
  type?: "single" | "multiple";
  defaultOpen?: string[];
  /** Heading level wrapping each trigger (WAI-ARIA accordion pattern). */
  headingLevel?: 2 | 3 | 4;
  /** Stable id prefix — must match the static AccordionView when used in a LazyIsland. */
  idPrefix?: string;
  className?: string;
};

/**
 * Interactive WAI-ARIA accordion (markup in AccordionView).
 * Keyboard: Enter/Space toggle; ArrowUp/ArrowDown/Home/End move between headers.
 */
export function Accordion({
  items,
  type = "single",
  defaultOpen = [],
  headingLevel = 3,
  idPrefix,
  className = "",
}: AccordionProps) {
  const generatedId = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <AccordionView
      items={items}
      open={open}
      idPrefix={idPrefix ?? generatedId}
      headingLevel={headingLevel}
      className={className}
      handlers={{
        onToggle: (id) =>
          setOpen((current) => {
            if (current.includes(id)) return current.filter((x) => x !== id);
            return type === "single" ? [id] : [...current, id];
          }),
        triggerRef: (index, node) => {
          triggers.current[index] = node;
        },
        onTriggerKeyDown: (index, e) => {
          const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
          const pos = enabled.indexOf(index);
          const keyMap: Record<string, number | undefined> = {
            ArrowDown: enabled[(pos + 1) % enabled.length],
            ArrowUp: enabled[(pos - 1 + enabled.length) % enabled.length],
            Home: enabled[0],
            End: enabled[enabled.length - 1],
          };
          const target = keyMap[e.key];
          if (target === undefined) return;
          e.preventDefault();
          triggers.current[target]?.focus();
        },
      }}
    />
  );
}
