import { MagneticButton } from "@/components/ui/MagneticButton";
import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";

/** Rete-ridge wave (same rhythm as the cross-section) — the Hipoderme "rises" into view. */
const EDGE = (() => {
  let d = "M0 80 L0 44 Q60 12 120 44";
  for (let x = 240; x <= 1440; x += 120) d += ` T${x} 44`;
  return `${d} L1440 80 Z`;
})();

function Title({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight);
  if (!highlight || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em className="font-light text-(--accent-text)">{highlight}</em>
      {text.slice(i + highlight.length)}
    </>
  );
}

/**
 * CTA final — the Hipoderme base (spec section 06: "CTA final grande sobre fundo Terracota").
 * Server Component; the CTAs reuse MagneticButton (already in the initial bundle).
 * White text on terracota/darker keeps ≥ 4.6:1. WhatsApp stays in pending mode until the real
 * number exists. Copy is provisional (VALIDAR / TODO(cliente)).
 */
export function FinalCta() {
  const { finalCta } = site;
  const href = getWhatsAppHref("final-cta");
  const noteId = "final-cta-whatsapp-note";

  return (
    <section
      aria-labelledby="final-cta-title"
      data-layer="hipoderme"
      data-tone="dark"
      className="final-cta layer-hipo-2 relative isolate"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="final-cta-edge text-terracota"
      >
        <path d={EDGE} fill="currentColor" />
      </svg>
      <div aria-hidden="true" className="final-cta-lobules" />

      <div className="relative container-page pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-3xl">
          <p className="kicker">{finalCta.kicker}</p>
          <h2
            id="final-cta-title"
            className="mt-5 text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.05] text-white"
          >
            <Title text={finalCta.titulo} highlight={finalCta.destaqueItalico} />
          </h2>
          <p className="mt-6 measure text-[1.0625rem] text-white lg:text-lg">
            {finalCta.texto}
            <PendingMark label="texto provisório" tone="light" />
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {href ? (
              <MagneticButton href={href} external variant="light" size="lg" arrow>
                {finalCta.ctaPrimario}
              </MagneticButton>
            ) : (
              <MagneticButton pending aria-describedby={noteId} variant="light" size="lg" arrow>
                {finalCta.ctaPrimario}
              </MagneticButton>
            )}
            <MagneticButton href={finalCta.ctaSecundario.href} variant="outline-light" size="lg">
              {finalCta.ctaSecundario.label}
            </MagneticButton>
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
