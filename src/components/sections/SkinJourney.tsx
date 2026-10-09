import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";
import { SkinJourneyIsland } from "./SkinJourneyIsland";
import { SkinJourneyView, type JourneyLayer } from "./SkinJourneyView";

/**
 * Jornada da Pele (#jornada) — the educational core of the page (spec sections 04 and 07).
 * Server Component: the cross-section, gauge and panels ship as static HTML (Epiderme
 * selected); the interactive behaviour is lazy-loaded near the viewport.
 * Layer copy is minimal and provisional (VALIDAR / TODO(cliente)) — no clinical claims.
 */
export function SkinJourney() {
  const pillarTitles = Object.fromEntries(site.pillars.map((p) => [p.slug, p.titulo]));
  const layers: JourneyLayer[] = [...site.skinLayers]
    .sort((a, b) => a.profundidade - b.profundidade)
    .map((l) => ({
      id: l.id,
      nome: l.nome,
      papel: l.papel,
      descricao: l.descricao,
      descricaoProvisoria: l.descricaoProvisoria ?? false,
      tratamentos: l.tratamentos.map((slug) => pillarTitles[slug] ?? slug),
    }));
  const showPendingMarkers = site.flags.showPendingMarkers;

  return (
    <section
      id="jornada"
      data-layer="derme"
      aria-labelledby="jornada-title"
      className="layer-derme-3 relative isolate overflow-x-clip section-space"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="kicker">Jornada da pele</p>
          <h2 id="jornada-title" className="mt-4">
            Da superfície à <em className="font-light text-(--accent-text)">profundidade</em>
          </h2>
          <p className="mt-5 measure text-cacau/90">
            Selecione uma camada para conhecê-la.
            <PendingMark label="conteúdo educativo em revisão" />
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <SkinJourneyIsland layers={layers} showPendingMarkers={showPendingMarkers}>
            <SkinJourneyView
              layers={layers}
              active={layers[0]?.id ?? "epiderme"}
              showPendingMarkers={showPendingMarkers}
            />
          </SkinJourneyIsland>
        </div>
      </div>
    </section>
  );
}
