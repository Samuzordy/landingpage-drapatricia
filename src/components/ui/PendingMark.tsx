import { site } from "@/content/site";
import { PendingTag } from "./PendingTag";

type PendingMarkProps = {
  label?: string;
  flush?: boolean;
  className?: string;
};

/**
 * Small "a validar" tag for data the client hasn't confirmed yet (VALIDAR / TODO(cliente)).
 * Rendered only while site.flags.showPendingMarkers is true, so it can be switched off at launch.
 */
export function PendingMark({ label, flush, className }: PendingMarkProps) {
  if (!site.flags.showPendingMarkers) return null;
  return <PendingTag label={label} flush={flush} className={className} />;
}
