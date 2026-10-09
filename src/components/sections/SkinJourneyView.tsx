import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { PendingTag } from "@/components/ui/PendingTag";
import type { SkinLayerId } from "@/types/content";
import { SkinCrossSection } from "./SkinCrossSection";

export type JourneyLayer = {
  id: SkinLayerId;
  nome: string;
  papel: string;
  descricao: string;
  descricaoProvisoria: boolean;
  /** Pillar titles linked to this layer — empty while pending medical review. */
  tratamentos: string[];
};

export type JourneyHandlers = {
  onSelect: (id: SkinLayerId) => void;
  onTabKeyDown: (index: number, e: KeyboardEvent<HTMLButtonElement>) => void;
  onLayerPointerEnter: (id: SkinLayerId, e: PointerEvent<SVGGElement>) => void;
};

const tabId = (id: SkinLayerId) => `jornada-tab-${id}`;
const panelId = (id: SkinLayerId) => `jornada-painel-${id}`;

/**
 * Jornada da Pele — pure markup (no hooks / "use client"). Rendered on the server as the static
 * first state (Epiderme selected) and reused by the interactive island, so both match.
 * Selection uses the WAI-ARIA tabs pattern: the "depth gauge" is the tablist, each layer panel a
 * tabpanel; the SVG mirrors the selected tab.
 */
export function SkinJourneyView({
  layers,
  active,
  showPendingMarkers,
  handlers,
}: {
  layers: JourneyLayer[];
  active: SkinLayerId;
  showPendingMarkers: boolean;
  handlers?: JourneyHandlers;
}) {
  const activeIndex = Math.max(
    0,
    layers.findIndex((l) => l.id === active),
  );
  const labels = Object.fromEntries(layers.map((l) => [l.id, l.nome])) as Record<
    SkinLayerId,
    string
  >;

  return (
    <div
      className="journey grid-page items-start gap-y-10"
      style={{ "--active-index": activeIndex, "--layer-count": layers.length } as CSSProperties}
    >
      <div className="col-span-4 lg:col-span-7">
        <div className="journey-figure relative">
          <SkinCrossSection
            active={active}
            labels={labels}
            onLayerPointerEnter={handlers?.onLayerPointerEnter}
          />
        </div>
      </div>

      <div className="col-span-4 lg:col-span-5 lg:pt-4">
        {/* Depth gauge = tablist (vertical on desktop, a row of buttons on small screens). */}
        <div role="tablist" aria-label="Camadas da pele" className="journey-tabs relative">
          <span aria-hidden="true" className="journey-gauge">
            <span className="journey-gauge-marker" />
          </span>
          {layers.map((layer, i) => {
            const selected = layer.id === active;
            return (
              <button
                key={layer.id}
                id={tabId(layer.id)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId(layer.id)}
                tabIndex={selected ? 0 : -1}
                onClick={handlers ? () => handlers.onSelect(layer.id) : undefined}
                onKeyDown={handlers ? (e) => handlers.onTabKeyDown(i, e) : undefined}
                className="journey-tab"
              >
                <span className="journey-tab-index tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="journey-tab-name">{layer.nome}</span>
                <span className="journey-tab-role">{layer.papel}</span>
              </button>
            );
          })}
        </div>

        {layers.map((layer, i) => (
          <div
            key={layer.id}
            id={panelId(layer.id)}
            role="tabpanel"
            aria-labelledby={tabId(layer.id)}
            tabIndex={0}
            hidden={layer.id !== active}
            className="journey-panel mt-8 rounded-card"
          >
            <p className="kicker">
              Camada {String(i + 1).padStart(2, "0")} · {layer.papel}
            </p>
            <h3 className="mt-3 text-[2.25rem] leading-none font-light lg:text-[2.75rem]">
              {layer.nome}
            </h3>
            <p className="mt-4 measure text-[1.0625rem] text-cacau/90">
              {layer.descricao}
              {layer.descricaoProvisoria && showPendingMarkers && (
                <PendingTag label="texto em revisão médica" />
              )}
            </p>

            <div className="mt-6 border-t border-cacau/15 pt-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-cacau/90 uppercase">
                Tratamentos relacionados
              </p>
              {layer.tratamentos.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {layer.tratamentos.map((t) => (
                    <li
                      key={t}
                      className="rounded-pill border border-cacau/20 px-3 py-1 text-sm text-cacau"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-cacau/90">
                  Em definição com a Dra. Valéria.
                  {showPendingMarkers && <PendingTag label="a validar" />}
                </p>
              )}
              <a
                href="#tratamentos"
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-cacau underline decoration-rose underline-offset-4"
              >
                Ver pilares de atuação
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
