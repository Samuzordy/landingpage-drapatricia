import { PendingMark } from "@/components/ui/PendingMark";
import { isPending, site } from "@/content/site";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";
import { ConditionChipList } from "./ConditionChipList";
import { ConditionsIsland } from "./ConditionsIsland";

/**
 * Provisional text while the client hasn't written/approved the "quando procurar" copy.
 * Deliberately generic — never a medical recommendation.
 */
const PENDING_HINT = "Orientação sobre quando procurar atendimento em revisão pela Dra. Valéria.";

/**
 * Quando procurar uma dermatologista (#condicoes). Server Component. Chips ship as static HTML;
 * tooltip + bottom sheet are lazy-loaded near the viewport (ConditionsIsland).
 */
export function Conditions() {
  const pillarTitles = Object.fromEntries(site.pillars.map((p) => [p.slug, p.titulo]));
  const anyPending = site.conditions.some((c) => isPending(c.quandoProcurar));
  const conditions = site.conditions.map((c) => ({
    nome: c.nome,
    hint: isPending(c.quandoProcurar) ? PENDING_HINT : c.quandoProcurar,
    hintPending: isPending(c.quandoProcurar),
    pillar: pillarTitles[c.pilar] ?? "",
  }));

  return (
    <section
      id="condicoes"
      data-layer="derme"
      aria-labelledby="condicoes-title"
      className="layer-derme-4 section-space"
    >
      <div className="container-page grid-page gap-y-10">
        <div className="col-span-4 lg:col-span-5">
          <p className="kicker">Quando procurar</p>
          <h2 id="condicoes-title" className="mt-4">
            Quando procurar uma <em className="font-light text-terracota">dermatologista</em>
          </h2>
          <p className="mt-5 measure text-cacau/85">
            Toque ou passe o cursor sobre uma condição para ver quando vale buscar avaliação.
            {anyPending && <PendingMark label="textos em revisão médica" />}
          </p>
        </div>

        <div className="col-span-4 lg:col-span-7 lg:pt-3">
          <ConditionsIsland
            conditions={conditions}
            whatsapp={{
              label: site.hero.ctaPrimario,
              href: getWhatsAppHref("conditions"),
              pendingNote: WHATSAPP_PENDING_NOTE,
            }}
            showPendingMarkers={site.flags.showPendingMarkers}
          >
            <ConditionChipList conditions={conditions} />
          </ConditionsIsland>
        </div>
      </div>
    </section>
  );
}
