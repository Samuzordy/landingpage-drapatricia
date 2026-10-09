type PendingTagProps = {
  label?: string;
  /** No leading margin — for tags that start a line or sit in a flex row with gap. */
  flush?: boolean;
  className?: string;
};

/**
 * Pure visual tag for unconfirmed data ("a validar"). No content import, so client islands can
 * use it without pulling site.ts into their chunk. Server code should prefer PendingMark,
 * which also respects site.flags.showPendingMarkers.
 * cacau/90 keeps ≥ 4.5:1 even on the deepest band (Derme profunda #D2A796).
 */
export function PendingTag({
  label = "a validar",
  flush = false,
  className = "",
}: PendingTagProps) {
  return (
    <span
      className={`${flush ? "" : "ml-2"} inline-flex items-center rounded-pill border border-dashed border-rose px-2 py-0.5 align-middle font-sans text-[0.6875rem] leading-none font-medium tracking-[0.06em] text-cacau/90 normal-case ${className}`}
    >
      {label}
    </span>
  );
}
