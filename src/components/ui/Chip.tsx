import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CheckIcon } from "./icons";
import { Tooltip } from "./Tooltip";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  /** Toggle state, exposed as aria-pressed. Omit for a non-toggle chip. */
  selected?: boolean;
  /** "Quando procurar" hint (≤ 140 chars). Shown as Tooltip; Etapa 4 adds the mobile bottom-sheet. */
  hint?: ReactNode;
  /** Renders a non-interactive label instead of a button. */
  static?: boolean;
};

const chipClasses = [
  "chip inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-sm font-medium",
  "transition-colors duration-(--dur-fast) ease-skin",
].join(" ");

/**
 * Condition chip (spec section 07): fills Porcelana → Terracota with white text in 180ms on
 * hover, keyboard focus and when selected. Server-compatible; Tooltip is the only client part.
 */
export function Chip({
  children,
  selected,
  hint,
  static: isStatic = false,
  className = "",
  type = "button",
  ...rest
}: ChipProps) {
  if (isStatic) {
    return <span className={`${chipClasses} ${className}`}>{children}</span>;
  }

  const chip = (
    <button
      {...rest}
      type={type}
      aria-pressed={selected}
      data-selected={selected || undefined}
      className={`${chipClasses} ${className}`}
    >
      {/* Visible "selected" cue that doesn't rely on color alone (focus also fills the chip). */}
      {selected && <CheckIcon width={16} height={16} className="-ml-1" />}
      {children}
    </button>
  );

  return hint ? <Tooltip content={hint}>{chip}</Tooltip> : chip;
}
