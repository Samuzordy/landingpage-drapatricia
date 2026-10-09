import { DermatoscopeLens } from "@/components/motion/DermatoscopeLens";
import { StarIcon } from "@/components/ui/icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PendingMark } from "@/components/ui/PendingMark";
import { portraitPlaceholder, skinDetailPlaceholder } from "@/content/placeholders";
import { site } from "@/content/site";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";

/** Splits the title so the highlighted words render in Fraunces italic ("sua pele"). */
function HeroTitle({ text, highlight }: { text: string; highlight: string }) {
  const index = text.indexOf(highlight);
  if (!highlight || index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <em className="font-light text-terracota">{highlight}</em>
      {text.slice(index + highlight.length)}
    </>
  );
}

function GoogleRatingBadge() {
  const rating = site.settings.googleRating;
  if (rating) {
    return (
      <a
        href={rating.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-areia bg-porcelana/70 px-4 text-sm text-cacau"
      >
        <StarIcon width={16} height={16} className="text-terracota" />
        <span>
          <strong className="tabular">{rating.nota.toLocaleString("pt-BR")}</strong> ·{" "}
          {rating.total} avaliações no Google
        </span>
        <span className="sr-only">(abre em nova aba)</span>
      </a>
    );
  }
  // TODO(cliente): rating, total and Google Business Profile link. Never invented — while
  // missing, only a clearly provisional badge shows (and nothing once markers are disabled).
  if (!site.flags.showPendingMarkers) return null;
  return (
    <p className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-dashed border-rose px-4 text-sm text-cacau/85">
      <StarIcon width={16} height={16} className="text-rose" />
      Avaliações no Google
      <PendingMark label="dado pendente" flush />
    </p>
  );
}

/**
 * Hero — Epiderme band (spec sections 04 and 06). Server Component; only the lens and the
 * magnetic CTAs hydrate.
 */
export function Hero() {
  const { hero, specialist } = site;
  const whatsappHref = getWhatsAppHref("hero");
  const noteId = "hero-whatsapp-note";

  return (
    <section
      id="inicio"
      data-layer="epiderme"
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip pt-28 pb-16 md:pt-32 lg:pt-40 lg:pb-28"
    >
      {/* Organic "cells" breathing slowly in the background (decorative). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="hero-cell top-[6%] -right-[18%] size-[26rem] bg-areia lg:right-[2%] lg:size-[34rem] motion-ok:animate-breathe" />
        <span className="hero-cell bottom-[4%] -left-[22%] size-[20rem] bg-rose/25 [animation-delay:-3s] lg:left-[-6%] motion-ok:animate-breathe" />
      </div>

      <div className="container-page grid-page items-center gap-y-14">
        <div className="col-span-4 lg:col-span-6 lg:pr-4">
          <p className="kicker">{hero.kicker}</p>
          <h1 id="hero-title" className="mt-5 text-cacau">
            <HeroTitle text={hero.titulo} highlight={hero.destaqueItalico} />
          </h1>
          <p className="mt-6 measure text-[1.0625rem] text-cacau/85 lg:text-lg">
            {hero.subtitulo}
            <PendingMark />
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {whatsappHref ? (
              <MagneticButton href={whatsappHref} external size="lg" arrow>
                {hero.ctaPrimario}
              </MagneticButton>
            ) : (
              <MagneticButton pending aria-describedby={noteId} size="lg" arrow>
                {hero.ctaPrimario}
              </MagneticButton>
            )}
            <MagneticButton href={hero.ctaSecundario.href} variant="secondary" size="lg">
              {hero.ctaSecundario.label}
            </MagneticButton>
          </div>
          {!whatsappHref && (
            <p id={noteId} className="mt-3 text-sm text-cacau/80">
              {WHATSAPP_PENDING_NOTE}
              <PendingMark label="número pendente" />
            </p>
          )}

          <div className="mt-8">
            <GoogleRatingBadge />
          </div>
        </div>

        <figure className="relative col-span-4 mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:col-span-5 lg:col-start-8 lg:max-w-none">
          {/* Concentric rings echo the dermatoscope (decorative). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -top-[12%] -right-[16%] -z-10 w-[78%] text-rose"
          >
            {[60, 100, 140, 180].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity={0.7 - i * 0.15}
              />
            ))}
          </svg>
          <DermatoscopeLens
            base={specialist.foto ?? portraitPlaceholder}
            detail={specialist.fotoDetalhe ?? skinDetailPlaceholder}
            priority
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 30rem, 90vw"
            className="hero-frame bg-areia shadow-warm"
          />
          <figcaption className="mt-4 text-center text-xs text-cacau/75">
            {specialist.foto ? specialist.nomeExibicao : "Imagem provisória"}
            {!specialist.foto && <PendingMark label="foto pendente" />}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
