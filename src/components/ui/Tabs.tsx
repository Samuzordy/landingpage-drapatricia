"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  /** Accessible name for the tab list. */
  label: string;
  defaultValue?: string;
  /** Controlled mode (e.g. SkinJourney syncing hover and tabs). */
  value?: string;
  onValueChange?: (id: string) => void;
  className?: string;
};

/**
 * WAI-ARIA tabs with automatic activation and roving tabindex.
 * Keyboard: ArrowLeft/ArrowRight (wrapping), Home/End. The tab list scrolls horizontally on
 * narrow screens (spec: Locais "abas roláveis horizontalmente"). Panels fade in (opacity +
 * 12px slide); with reduced motion only the opacity remains.
 */
export function Tabs({
  items,
  label,
  defaultValue,
  value,
  onValueChange,
  className = "",
}: TabsProps) {
  const baseId = useId();
  const firstEnabled = items.find((it) => !it.disabled)?.id;
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled);
  const selected = value ?? internal;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onValueChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
    const pos = enabled.indexOf(index);
    const keyMap: Record<string, number | undefined> = {
      ArrowRight: enabled[(pos + 1) % enabled.length],
      ArrowLeft: enabled[(pos - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled[enabled.length - 1],
    };
    const target = keyMap[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const item = items[target];
    if (!item) return;
    select(item.id);
    const tab = tabs.current[target];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="tabs-list -mx-1 flex snap-x gap-2 overflow-x-auto px-1 py-1"
      >
        {items.map((item, index) => {
          const isSelected = item.id === selected;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className="min-h-11 shrink-0 snap-start rounded-pill border border-areia px-5 text-sm font-semibold whitespace-nowrap text-cacau transition-colors duration-(--dur-fast) ease-skin hover:border-rose disabled:cursor-not-allowed disabled:opacity-50 aria-selected:border-terracota aria-selected:bg-terracota aria-selected:text-white"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* All panels stay in the DOM (valid aria-controls); inactive ones are `hidden`.
          Leaving display:none restarts the CSS enter animation. */}
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          tabIndex={0}
          hidden={item.id !== selected}
          className="tabs-panel mt-6"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
