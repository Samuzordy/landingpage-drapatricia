import { MagnifierLens } from "@/components/motion/MagnifierLens";
import { CroppedImage } from "@/components/ui/CroppedImage";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { StarIcon } from "@/components/ui/icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";
import { resolveHref } from "@/lib/sections";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";

const PORTRAIT_ASPECT = 4 / 5;
const PORTRAIT_SIZES = "(min-width: 1024px) 34vw, (min-width: 640px) 30rem, 90vw";

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
          <strong className="tabular">{rating.rating.toLocaleString("pt-BR")}</strong> ·{" "}
          {rating.total} avaliações no Google
        </span>
        <span className="sr-only">(abre em nova aba)</span>
      </a>
    );
  }
  // Never invented — while missing, only a clearly provisional badge shows (and nothing once
  // markers are disabled).
  if (!site.flags.showPendingMarkers) return null;
  return (
    <p className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-dashed border-rose px-4 text-sm text-cacau/90">
      <StarIcon width={16} height={16} className="text-rose" />
      Avaliações no Google
      <PendingMark label="dado pendente" flush />
    </p>
  );
}

/**
 * Hero — the light surface at the top of the page. Server Component; only the magnetic CTAs
 * (and the optional lens) hydrate. The portrait is the LCP image (priority/preload).
 */
export function Hero() {
  const { hero, images, professional } = site;
  const whatsappHref = getWhatsAppHref("hero");
  const secondaryHref = resolveHref(hero.secondaryCta.href);
  const noteId = "hero-whatsapp-note";

  return (
    <section
      id="inicio"
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
            <HighlightedText text={hero.title} highlight={hero.highlight} />
          </h1>
          <p className="mt-6 measure text-[1.0625rem] text-cacau/90 lg:text-lg">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {whatsappHref ? (
              <MagneticButton href={whatsappHref} external size="lg" arrow>
                {hero.primaryCta}
              </MagneticButton>
            ) : (
              <MagneticButton pending aria-describedby={noteId} size="lg" arrow>
                {hero.primaryCta}
              </MagneticButton>
            )}
            {secondaryHref && (
              <MagneticButton href={secondaryHref} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </MagneticButton>
            )}
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
          {/* Concentric rings behind the portrait (decorative). */}
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
          {hero.lens ? (
            <MagnifierLens
              base={images.hero}
              detail={hero.lens.detail}
              label={hero.lens.label}
              priority
              aspect={PORTRAIT_ASPECT}
              sizes={PORTRAIT_SIZES}
              className="hero-frame bg-areia shadow-warm"
            />
          ) : (
            <div
              className="hero-frame relative overflow-hidden bg-areia shadow-warm"
              style={{ aspectRatio: PORTRAIT_ASPECT }}
            >
              <CroppedImage
                asset={images.hero}
                frameAspect={PORTRAIT_ASPECT}
                sizes={PORTRAIT_SIZES}
                priority
              />
            </div>
          )}
          <figcaption className="mt-4 text-center text-xs text-cacau/75">
            {professional.displayName}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
