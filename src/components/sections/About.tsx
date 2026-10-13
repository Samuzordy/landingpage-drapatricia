import { CroppedImage } from "@/components/ui/CroppedImage";
import { PendingMark } from "@/components/ui/PendingMark";
import { Timeline } from "@/components/ui/Timeline";
import { isPending, site } from "@/content/site";
import { bandProps } from "@/lib/sections";

/**
 * Sobre (#sobre). Server Component, zero JS: the Timeline emphasis is CSS-only.
 * Council registrations are always visible here (and in the footer).
 */
export function About() {
  const { about, professional, images } = site;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      {...bandProps("about")}
      className="relative isolate overflow-x-clip section-space depth-band"
    >
      <div className="container-page grid-page gap-y-14">
        {/* Portrait in an organic frame */}
        <figure className="relative col-span-4 mx-auto w-full max-w-[24rem] lg:col-span-5 lg:mx-0 lg:max-w-none">
          <div className="lg:sticky lg:top-28">
            <span
              aria-hidden="true"
              className="about-cell absolute -top-6 -left-8 -z-10 size-40 bg-areia motion-ok:animate-breathe"
            />
            <div className="about-frame relative aspect-[4/5] overflow-hidden bg-areia shadow-warm">
              <CroppedImage
                asset={images.about}
                frameAspect={4 / 5}
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 24rem, 90vw"
              />
            </div>
            <figcaption className="mt-4 text-center text-xs text-cacau/75 lg:text-left">
              {professional.displayName}
            </figcaption>
          </div>
        </figure>

        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <p className="kicker">{about.kicker}</p>
          <h2 id="sobre-title" className="mt-4">
            {professional.displayName}
            <span className="mt-2 block font-display text-[0.55em] font-light text-cacau/80 italic">
              {professional.title} · {professional.specialty}
            </span>
          </h2>

          <div className="mt-8 measure space-y-4 text-cacau/90">
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {about.facts.length > 0 && (
            <dl className="mt-10 grid gap-x-6 gap-y-4 border-t border-areia pt-8 sm:grid-cols-[9rem_1fr]">
              {about.facts.map((fact) => (
                <div key={fact.term} className="contents">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-cacau/75 uppercase sm:pt-1">
                    {fact.term}
                  </dt>
                  <dd className="-mt-3 text-cacau sm:mt-0">
                    <span className={fact.emphasis ? "font-semibold tabular" : ""}>
                      {fact.detail}
                    </span>
                    {fact.pending && <PendingMark />}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {about.timeline.length > 0 && (
            <div className="mt-14">
              <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-cacau/75 uppercase">
                {about.timelineTitle}
              </h3>
              <Timeline
                label={about.timelineTitle}
                className="mt-6"
                items={about.timeline.map((item) => ({
                  year: item.year,
                  title: item.title,
                  // Pending descriptions are omitted instead of showing placeholder copy.
                  description: isPending(item.description) ? undefined : item.description,
                }))}
              />
            </div>
          )}

          {about.institutions.length > 0 && (
            <div className="mt-14">
              <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-cacau/75 uppercase">
                {about.institutionsTitle}
              </h3>
              {/* Monograms instead of logos: official logos need usage permission. */}
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-5">
                {about.institutions.map((inst) => (
                  <li key={inst.abbreviation} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-full border border-rose font-display text-sm text-cacau"
                    >
                      {inst.abbreviation}
                    </span>
                    <span className="max-w-[12rem] text-sm leading-snug text-cacau/90">
                      {inst.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isPending(about.quote) && (
            <figure className="mt-14 border-l-2 border-terracota pl-6">
              <blockquote className="font-display text-2xl leading-snug font-light text-cacau italic">
                {about.quote}
              </blockquote>
              <figcaption className="mt-3 text-sm text-cacau/80">
                {professional.displayName}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
