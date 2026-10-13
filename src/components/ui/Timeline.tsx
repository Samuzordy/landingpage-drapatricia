import type { ReactNode } from "react";

export type TimelineMilestone = {
  /** Year or label such as "hoje". */
  year: string;
  title: ReactNode;
  description?: ReactNode;
};

export type TimelineProps = {
  items: TimelineMilestone[];
  label?: string;
  className?: string;
};

/**
 * Vertical milestone list (About: education → … → hoje). CSS-only Server Component.
 * Fine pointers: hovering a milestone enlarges its year and fills the connector up to it
 * (via :has()). Descriptions are always present and readable — hover only adds emphasis —
 * so nothing depends on hover.
 */
export function Timeline({ items, label = "Linha do tempo", className = "" }: TimelineProps) {
  return (
    <ol aria-label={label} className={`timeline ${className}`}>
      {items.map((item, i) => (
        <li
          key={`${item.year}-${i}`}
          className="timeline-item relative pb-10 pl-9 last:pb-0 sm:grid sm:grid-cols-[6rem_1fr] sm:gap-x-6"
        >
          <span aria-hidden="true" className="timeline-rail">
            <span className="timeline-fill" />
          </span>
          <span aria-hidden="true" className="timeline-dot" />
          {/* Fraunces ≥ 24px: terracota passes the 3:1 large-text threshold. */}
          <p className="timeline-year font-display text-2xl leading-none text-terracota tabular sm:text-3xl">
            {item.year}
          </p>
          <div className="mt-2 sm:mt-0">
            <p className="font-semibold text-cacau">{item.title}</p>
            {item.description && <p className="mt-1 measure text-cacau/85">{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
