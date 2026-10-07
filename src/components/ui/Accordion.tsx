"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { PlusIcon } from "./icons";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  /** "single": opening one closes the others (Pillars on mobile). */
  type?: "single" | "multiple";
  defaultOpen?: string[];
  /** Heading level wrapping each trigger (WAI-ARIA accordion pattern). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

/**
 * WAI-ARIA accordion: button with aria-expanded/aria-controls inside a heading, region panel.
 * Height animates with grid-template-rows 0fr → 1fr and "+" turns 45° into "×" (spec section 07).
 * Closed panels are `inert`, so hidden content is never focusable.
 * Keyboard: Enter/Space toggle; ArrowUp/ArrowDown/Home/End move between headers.
 */
export function Accordion({
  items,
  type = "single",
  defaultOpen = [],
  headingLevel = 3,
  className = "",
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const Heading = `h${headingLevel}` as const;

  const toggle = (id: string) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return type === "single" ? [id] : [...current, id];
    });

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
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
  };

  return (
    <div className={`divide-y divide-areia border-y border-areia ${className}`}>
      {items.map((item, index) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id} className="accordion-item" data-open={isOpen || undefined}>
            <Heading className="font-sans text-base font-semibold">
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-cacau transition-colors duration-(--dur-fast) ease-skin hover:text-terracota-texto disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-pill border border-areia transition-colors duration-(--dur-fast) group-hover:border-rose group-aria-expanded:border-terracota"
                >
                  <PlusIcon className="accordion-icon" />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className="accordion-panel"
            >
              <div className="overflow-hidden">
                <div className="measure pb-6 text-cacau/90">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
