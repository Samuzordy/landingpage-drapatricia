import { HighlightedText } from "@/components/ui/HighlightedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";
import { resolveHref } from "@/lib/sections";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";

/** Organic wave edge — the dark base "rises" into view over the previous section. */
const EDGE = (() => {
  let d = "M0 80 L0 44 Q60 12 120 44";
  for (let x = 240; x <= 1440; x += 120) d += ` T${x} 44`;
  return `${d} L1440 80 Z`;
})();

/**
 * CTA final (#agendar) — the first dark band, on the primary brand color.
 * Server Component; the CTAs reuse MagneticButton (already in the initial bundle).
 * White text on the primary color/darker keeps ≥ 4.6:1 with the default theme.
 * WhatsApp stays in pending mode until the real number exists.
 */
export function FinalCta() {
  const { finalCta } = site;
  const href = getWhatsAppHref("final-cta");
  const secondaryHref = resolveHref(finalCta.secondaryCta.href);
  const noteId = "final-cta-whatsapp-note";

  return (
    <section
      id="agendar"
      aria-labelledby="final-cta-title"
      data-tone="dark"
      className="final-cta band-dark-1 relative isolate"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="final-cta-edge text-band-base"
      >
        <path d={EDGE} fill="currentColor" />
      </svg>
      <div aria-hidden="true" className="final-cta-texture" />

      <div className="relative container-page pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-3xl">
          <p className="kicker">{finalCta.kicker}</p>
          <h2
            id="final-cta-title"
            className="mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.05] text-white"
          >
            <HighlightedText text={finalCta.title} highlight={finalCta.highlight} />
          </h2>
          <p className="mt-6 measure text-[1.0625rem] text-white lg:text-lg">{finalCta.text}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {href ? (
              <MagneticButton href={href} external variant="light" size="lg" arrow>
                {finalCta.primaryCta}
              </MagneticButton>
            ) : (
              <MagneticButton pending aria-describedby={noteId} variant="light" size="lg" arrow>
                {finalCta.primaryCta}
              </MagneticButton>
            )}
            {secondaryHref && (
              <MagneticButton href={secondaryHref} variant="outline-light" size="lg">
                {finalCta.secondaryCta.label}
              </MagneticButton>
            )}
          </div>
          {!href && (
            <p id={noteId} className="mt-3 text-sm text-white">
              {WHATSAPP_PENDING_NOTE}
              <PendingMark label="número pendente" tone="light" />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
