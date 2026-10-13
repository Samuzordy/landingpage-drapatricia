import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { bandProps, sectionHref } from "@/lib/sections";
import { skinJourney } from "./content";
import { SkinJourneyIsland } from "./SkinJourneyIsland";
import { SkinJourneyView, type JourneyLayer } from "./SkinJourneyView";
import "./skin-journey.css";

/**
 * DERMATOLOGY VARIANT of the SpecialtyFeature section — "Jornada da Pele" (#destaque).
 * Server Component: the cross-section, gauge and panels ship as static HTML (first layer
 * selected); the interactive behaviour is lazy-loaded near the viewport.
 * Enable with `specialtyFeature.variant: "dermatology-skin-journey"` in site.ts.
 */
export function SkinJourney() {
  const layers: JourneyLayer[] = skinJourney.layers.map((l) => ({
    id: l.id,
    name: l.name,
    role: l.role,
    description: l.description,
    pendingReview: l.pendingReview ?? false,
    related: l.related,
  }));
  const labels = {
    tabs: skinJourney.tabsLabel,
    related: skinJourney.relatedLabel,
    emptyRelated: skinJourney.emptyRelated,
    servicesLink: skinJourney.servicesLinkLabel,
    servicesHref: sectionHref("services"),
  };
  const showPendingMarkers = site.flags.showPendingMarkers;

  return (
    <section
      id="destaque"
      aria-labelledby="destaque-title"
      {...bandProps("specialtyFeature")}
      className="relative isolate overflow-x-clip section-space depth-band"
    >
      <div className="container-page">
        <SectionHeading
          heading={skinJourney.heading}
          titleId="destaque-title"
          pendingLabel="conteúdo educativo em revisão"
          className="max-w-2xl"
        />

        <div className="mt-12 lg:mt-16">
          <SkinJourneyIsland
            layers={layers}
            labels={labels}
            showPendingMarkers={showPendingMarkers}
          >
            <SkinJourneyView
              layers={layers}
              labels={labels}
              active={layers[0]?.id ?? "epiderme"}
              showPendingMarkers={showPendingMarkers}
            />
          </SkinJourneyIsland>
        </div>
      </div>
    </section>
  );
}
