import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { PendingTag } from "@/components/ui/PendingTag";
import type { SkinLayerId } from "./content";
import { SkinCrossSection } from "./SkinCrossSection";

export type JourneyLayer = {
  id: SkinLayerId;
  name: string;
  role: string;
  description: string;
  pendingReview: boolean;
  /** Related service titles — empty while pending professional review. */
  related: string[];
};

export type JourneyLabels = {
  tabs: string;
  related: string;
  emptyRelated: string;
  servicesLink: string;
  /** Anchor of the services section, or null when it's disabled (link hidden). */
  servicesHref: string | null;
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
 * first state (first layer selected) and reused by the interactive island, so both match.
 * Selection uses the WAI-ARIA tabs pattern: the "depth gauge" is the tablist, each layer panel a
 * tabpanel; the SVG mirrors the selected tab.
 */
export function SkinJourneyView({
  layers,
  labels,
  active,
  showPendingMarkers,
  handlers,
}: {
  layers: JourneyLayer[];
  labels: JourneyLabels;
  active: SkinLayerId;
  showPendingMarkers: boolean;
  handlers?: JourneyHandlers;
}) {
  const activeIndex = Math.max(
    0,
    layers.findIndex((l) => l.id === active),
  );
  const layerNames = Object.fromEntries(layers.map((l) => [l.id, l.name])) as Record<
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
            labels={layerNames}
            onLayerPointerEnter={handlers?.onLayerPointerEnter}
          />
        </div>
      </div>

      <div className="col-span-4 lg:col-span-5 lg:pt-4">
        {/* Depth gauge = tablist (vertical on desktop, a row of buttons on small screens). */}
        <div role="tablist" aria-label={labels.tabs} className="journey-tabs relative">
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
                <span className="journey-tab-name">{layer.name}</span>
                <span className="journey-tab-role">{layer.role}</span>
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
              Camada {String(i + 1).padStart(2, "0")} · {layer.role}
            </p>
            <h3 className="mt-3 text-[2.25rem] leading-none font-light lg:text-[2.75rem]">
              {layer.name}
            </h3>
            <p className="mt-4 measure text-[1.0625rem] text-cacau/90">
              {layer.description}
              {layer.pendingReview && showPendingMarkers && <PendingTag label="texto em revisão" />}
            </p>

            <div className="mt-6 border-t border-cacau/15 pt-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-cacau/90 uppercase">
                {labels.related}
              </p>
              {layer.related.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {layer.related.map((t) => (
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
                  {labels.emptyRelated}
                  {showPendingMarkers && <PendingTag label="a validar" />}
                </p>
              )}
              {labels.servicesHref && (
                <a
                  href={labels.servicesHref}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-cacau underline decoration-rose underline-offset-4"
                >
                  {labels.servicesLink}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
