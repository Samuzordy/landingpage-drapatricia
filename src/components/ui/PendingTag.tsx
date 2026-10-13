type PendingTagProps = {
  label?: string;
  /** No leading margin — for tags that start a line or sit in a flex row with gap. */
  flush?: boolean;
  /** "light" for the dark bands (final CTA, footer). */
  tone?: "default" | "light";
  className?: string;
};

const toneClasses = {
  // cacau/90 keeps ≥ 4.5:1 even on the deepest light band (--color-band-deep).
  default: "border-rose text-cacau/90",
  // white keeps ≥ 4.6:1 on terracota and above on the darker footer band.
  light: "border-white/60 text-white",
};

/**
 * Pure visual tag for unconfirmed data ("a validar"). No content import, so client islands can
 * use it without pulling site.ts into their chunk. Server code should prefer PendingMark,
 * which also respects site.flags.showPendingMarkers.
 */
export function PendingTag({
  label = "a validar",
  flush = false,
  tone = "default",
  className = "",
}: PendingTagProps) {
  return (
    <span
      className={`${flush ? "" : "ml-2"} inline-flex items-center rounded-pill border border-dashed px-2 py-0.5 align-middle font-sans text-[0.6875rem] leading-none font-medium tracking-[0.06em] normal-case ${toneClasses[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
