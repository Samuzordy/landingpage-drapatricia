import Image from "next/image";
import { PendingMark } from "@/components/ui/PendingMark";
import { Timeline } from "@/components/ui/Timeline";
import { portraitPlaceholder } from "@/content/placeholders";
import { isPending, site } from "@/content/site";

/**
 * Sobre a especialista (#sobre) — start of the Derme band. Server Component, zero JS:
 * the Timeline emphasis is CSS-only.
 * CRM and RQE are always visible here (CFM 2.336/2023). Unconfirmed data keeps its marks.
 */
export function About() {
  const { specialist } = site;
  const photo = specialist.foto ?? portraitPlaceholder;
  const quotePending = isPending(specialist.citacao);

  // Facts list — every line comes from the spec (section 03). VALIDAR all of them.
  const facts = [
    { term: "Registro", detail: `${specialist.crm} · ${specialist.rqe}` },
    { term: "Formação", detail: "Medicina — Universidade Federal do Paraná (2003)" },
    { term: "Especialização", detail: "Título de especialista em Dermatologia — SBD (2013)" },
    { term: "Docência", detail: "Professora do curso de Medicina da PUCPR, desde 2010" },
    { term: "Idiomas", detail: specialist.idiomas.join(" e ") },
  ];

  return (
    <section
      id="sobre"
      data-layer="derme"
      aria-labelledby="sobre-title"
      className="layer-derme-1 relative isolate overflow-x-clip section-space"
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
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 24rem, 90vw"
                unoptimized={photo.src.endsWith(".svg")}
                className="object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="mt-4 text-center text-xs text-cacau/75 lg:text-left">
              {specialist.foto ? specialist.nomeExibicao : "Imagem provisória"}
              {!specialist.foto && <PendingMark label="foto pendente" />}
            </figcaption>
          </div>
        </figure>

        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          <p className="kicker">Sobre a especialista</p>
          <h2 id="sobre-title" className="mt-4">
            {specialist.nomeExibicao}
            <span className="mt-2 block font-display text-[0.55em] font-light text-cacau/80 italic">
              {specialist.especialidade}
            </span>
          </h2>

          <div className="mt-8 measure space-y-4 text-cacau/90">
            {specialist.bio.map((paragraph, i) => (
              <p key={i}>
                {paragraph}
                {i === specialist.bio.length - 1 && <PendingMark label="bio provisória" />}
              </p>
            ))}
          </div>

          <dl className="mt-10 grid gap-x-6 gap-y-4 border-t border-areia pt-8 sm:grid-cols-[9rem_1fr]">
            {facts.map((fact) => (
              <div key={fact.term} className="contents">
                <dt className="text-xs font-semibold tracking-[0.14em] text-cacau/75 uppercase sm:pt-1">
                  {fact.term}
                </dt>
                <dd className="-mt-3 text-cacau sm:mt-0">
                  <span className={fact.term === "Registro" ? "font-semibold tabular" : ""}>
                    {fact.detail}
                  </span>
                  {fact.term !== "Registro" && fact.term !== "Idiomas" && <PendingMark />}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14">
            <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-cacau/75 uppercase">
              Linha do tempo
              <PendingMark />
            </h3>
            <Timeline
              label="Linha do tempo da formação"
              className="mt-6"
              items={specialist.timeline.map((item) => ({
                year: item.ano,
                title: item.titulo,
                // Pending descriptions are omitted instead of showing placeholder copy.
                description: isPending(item.descricao) ? undefined : item.descricao,
              }))}
            />
          </div>

          <div className="mt-14">
            <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-cacau/75 uppercase">
              Instituições
              <PendingMark label="logos pendentes" />
            </h3>
            {/* TODO(cliente): official logos with usage permission; monograms meanwhile. */}
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-5">
              {specialist.instituicoes.map((inst) => (
                <li key={inst.sigla} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-full border border-rose font-display text-sm text-cacau"
                  >
                    {inst.sigla}
                  </span>
                  <span className="max-w-[12rem] text-sm leading-snug text-cacau/85">
                    {inst.nome}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {quotePending ? (
            site.flags.showPendingMarkers && (
              <p className="mt-14 rounded-card border border-dashed border-rose px-6 py-5 text-sm text-cacau/80">
                Citação-assinatura da Dra. Valéria
                <PendingMark label="texto pendente" />
              </p>
            )
          ) : (
            <figure className="mt-14 border-l-2 border-terracota pl-6">
              <blockquote className="font-display text-2xl leading-snug font-light text-cacau italic">
                {specialist.citacao}
              </blockquote>
              <figcaption className="mt-3 text-sm text-cacau/80">
                {specialist.nomeExibicao}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
