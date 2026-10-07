import { useId, type CSSProperties, type ReactNode } from "react";

export type MarqueeProps = {
  items: ReactNode[];
  /** Accessible name for the list (e.g. "Credenciais"). */
  label: string;
  /** Seconds for one full loop; slower = calmer. */
  duration?: number;
  separator?: ReactNode;
  /** Text of the pause control (WCAG 2.2.2: moving content needs a pause mechanism). */
  pauseLabel?: string;
  className?: string;
};

/**
 * Slow horizontal marquee, CSS-only (Server Component).
 * - pauses on hover (fine pointers), on keyboard focus inside it and via the pause toggle;
 * - the toggle is a native checkbox (`:has(:checked)` stops the animation), so no JS is needed;
 * - reduced motion: no animation at all, items wrap as a static list and the toggle is hidden.
 * The duplicated track that makes the loop seamless is aria-hidden.
 */
export function Marquee({
  items,
  label,
  duration = 40,
  separator = "·",
  pauseLabel = "Pausar animação",
  className = "",
}: MarqueeProps) {
  const toggleId = useId();

  const track = (hidden: boolean) => (
    <ul
      aria-label={hidden ? undefined : label}
      aria-hidden={hidden || undefined}
      className={`marquee-track flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:gap-y-2 ${hidden ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-5">{item}</span>
          <span aria-hidden="true" className="text-rose">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-viewport flex overflow-hidden">
        {track(false)}
        {track(true)}
      </div>
      <label
        htmlFor={toggleId}
        className="marquee-toggle mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill px-3 text-xs font-medium text-cacau/80 motion-reduce:hidden"
      >
        <input id={toggleId} type="checkbox" className="size-4 accent-terracota" />
        {pauseLabel}
      </label>
    </div>
  );
}
