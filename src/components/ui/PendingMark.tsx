import { site } from "@/content/site";

type PendingMarkProps = {
  label?: string;
  className?: string;
};

/**
 * Small "a validar" tag for data the client hasn't confirmed yet (VALIDAR / TODO(cliente)).
 * Rendered only while site.flags.showPendingMarkers is true, so it can be switched off at launch.
 */
export function PendingMark({ label = "a validar", className = "" }: PendingMarkProps) {
  if (!site.flags.showPendingMarkers) return null;
  return (
    <span
      className={`ml-2 inline-flex items-center rounded-pill border border-dashed border-rose px-2 py-0.5 align-middle font-sans text-[0.6875rem] leading-none font-medium tracking-[0.06em] text-cacau/80 normal-case ${className}`}
    >
      {label}
    </span>
  );
}
