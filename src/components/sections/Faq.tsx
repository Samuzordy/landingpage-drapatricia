import { AccordionView } from "@/components/ui/AccordionView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { bandProps } from "@/lib/sections";
import { FaqIsland } from "./FaqIsland";

const ID_PREFIX = "faq";

/**
 * Dúvidas frequentes (#duvidas). Server Component: the accordion ships as static HTML (all
 * closed) and becomes interactive near the viewport (FaqIsland).
 * FAQPage JSON-LD belongs to a production build, not to this preview template.
 */
export function Faq() {
  const { heading, items: faqs } = site.faq;
  const items = faqs.map((faq, i) => ({
    id: `pergunta-${i + 1}`,
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-title"
      {...bandProps("faq")}
      className="section-space depth-band"
    >
      <div className="container-page grid-page gap-y-10">
        <SectionHeading
          heading={heading}
          titleId="duvidas-title"
          className="col-span-4 lg:col-span-4"
        />

        <div className="col-span-4 lg:col-span-7 lg:col-start-6">
          <FaqIsland items={items} idPrefix={ID_PREFIX} headingLevel={3}>
            <AccordionView items={items} open={[]} idPrefix={ID_PREFIX} headingLevel={3} />
          </FaqIsland>
        </div>
      </div>
    </section>
  );
}
