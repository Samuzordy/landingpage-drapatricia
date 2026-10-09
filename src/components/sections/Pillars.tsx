import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";
import { PillarCardsView } from "./PillarCardsView";
import { PillarsIsland } from "./PillarsIsland";

/**
 * Pilares de atuação (#tratamentos). Server Component. The cards ship as static HTML (first card
 * open) and the interactive version is lazy-loaded near the viewport (PillarsIsland).
 * Services listed exactly as in the spec (section 03).
 */
export function Pillars() {
  const pillars = [...site.pillars]
    .sort((a, b) => a.ordem - b.ordem)
    .map(({ titulo, slug, mensagemChave, servicos }) => ({
      titulo,
      slug,
      mensagemChave,
      servicos,
    }));

  return (
    <section
      id="tratamentos"
      data-layer="derme"
      aria-labelledby="tratamentos-title"
      className="layer-derme-2 section-space"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="kicker">Tratamentos</p>
          <h2 id="tratamentos-title" className="mt-4">
            Pilares de <em className="font-light text-terracota">atuação</em>
          </h2>
          <p className="mt-5 measure text-cacau/85">
            Dermatologia clínica, cirúrgica e estética.
            <PendingMark label="lista de procedimentos a validar" />
          </p>
        </div>

        <PillarsIsland pillars={pillars}>
          <PillarCardsView pillars={pillars} active={0} />
        </PillarsIsland>
      </div>
    </section>
  );
}
