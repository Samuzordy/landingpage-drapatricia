import type { KeyboardEvent, ReactNode } from "react";
import { PlusIcon } from "./icons";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionHandlers = {
  onToggle: (id: string) => void;
  onTriggerKeyDown: (index: number, e: KeyboardEvent<HTMLButtonElement>) => void;
  triggerRef: (index: number, node: HTMLButtonElement | null) => void;
};

export type AccordionViewProps = {
  items: AccordionItem[];
  open: string[];
  idPrefix: string;
  headingLevel?: 2 | 3 | 4;
  className?: string;
  handlers?: AccordionHandlers;
};

/**
 * Pure accordion markup (no hooks / "use client"): the server renders it as the static closed
 * state and the interactive Accordion reuses it, so a lazy-loaded swap doesn't shift anything.
 * WAI-ARIA: button with aria-expanded/aria-controls inside a heading, region panel; closed
 * panels are `inert`. Height animates with grid-template-rows 0fr → 1fr; "+" turns into "×".
 */
export function AccordionView({
  items,
  open,
  idPrefix,
  headingLevel = 3,
  className = "",
  handlers,
}: AccordionViewProps) {
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={`divide-y divide-areia border-y border-areia ${className}`}>
      {items.map((item, index) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${idPrefix}-trigger-${item.id}`;
        const panelId = `${idPrefix}-panel-${item.id}`;
        return (
          <div key={item.id} className="accordion-item" data-open={isOpen || undefined}>
            <Heading className="font-sans text-base font-semibold">
              <button
                ref={handlers ? (node) => handlers.triggerRef(index, node) : undefined}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={handlers ? () => handlers.onToggle(item.id) : undefined}
                onKeyDown={handlers ? (e) => handlers.onTriggerKeyDown(index, e) : undefined}
                // --kicker-color = the band's small accent text colour (AA on every band).
                className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-cacau transition-colors duration-(--dur-fast) ease-soft hover:text-(--kicker-color) disabled:cursor-not-allowed disabled:opacity-50"
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
