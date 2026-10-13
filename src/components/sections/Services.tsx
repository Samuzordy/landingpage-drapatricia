import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { bandProps } from "@/lib/sections";
import { ServiceCardsView, type ServiceCardData } from "./ServiceCardsView";
import { ServicesIsland } from "./ServicesIsland";

/**
 * Áreas de atuação (#atuacao). Server Component. The cards ship as static HTML (first card
 * open) and the interactive version is lazy-loaded near the viewport (ServicesIsland).
 */
export function Services() {
  const { heading, items } = site.services;
  const services: ServiceCardData[] = items.map(({ title, slug, keyMessage, services, art }) => ({
    title,
    slug,
    keyMessage,
    services,
    art,
  }));

  return (
    <section
      id="atuacao"
      aria-labelledby="atuacao-title"
      {...bandProps("services")}
      className="section-space depth-band"
    >
      <div className="container-page">
        <SectionHeading heading={heading} titleId="atuacao-title" className="max-w-2xl" />

        <ServicesIsland services={services}>
          <ServiceCardsView services={services} active={0} />
        </ServicesIsland>
      </div>
    </section>
  );
}
