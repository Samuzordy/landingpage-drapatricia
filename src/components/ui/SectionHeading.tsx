import type { SectionHeading as SectionHeadingContent } from "@/types/content";
import { HighlightedText } from "./HighlightedText";
import { PendingMark } from "./PendingMark";

/**
 * Kicker + H2 (italic highlight) + optional intro, as used at the top of most sections.
 * `pendingLabel` adds an "a validar" mark (only while site.flags.showPendingMarkers is on).
 */
export function SectionHeading({
  heading,
  titleId,
  pendingLabel,
  className = "",
}: {
  heading: SectionHeadingContent;
  titleId: string;
  pendingLabel?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="kicker">{heading.kicker}</p>
      <h2 id={titleId} className="mt-4">
        <HighlightedText text={heading.title} highlight={heading.highlight} />
      </h2>
      {heading.intro ? (
        <p className="mt-5 measure text-cacau/90">
          {heading.intro}
          {pendingLabel && <PendingMark label={pendingLabel} />}
        </p>
      ) : (
        pendingLabel && <PendingMark label={pendingLabel} flush className="mt-5" />
      )}
    </div>
  );
}
