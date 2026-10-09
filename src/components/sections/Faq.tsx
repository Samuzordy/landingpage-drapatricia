import { AccordionView } from "@/components/ui/AccordionView";
import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";
import { FaqIsland } from "./FaqIsland";

const ID_PREFIX = "faq";

/**
 * Dúvidas frequentes (#duvidas) — entrance of the Hipoderme. Server Component: the accordion
 * ships as static HTML (all closed) and becomes interactive near the viewport (FaqIsland).
 * Answers are provisional and neutral (VALIDAR / TODO(cliente)): they only say the information
 * will be confirmed — no policies, prices or rules are invented.
 * The FAQPage JSON-LD is part of the production phase, not this preview.
 */
export function Faq() {
  const items = [...site.faqs]
    .sort((a, b) => a.ordem - b.ordem)
    .map((faq) => ({
      id: `pergunta-${faq.ordem}`,
      title: faq.pergunta,
      content: <p>{faq.resposta}</p>,
    }));

  return (
    <section
      id="duvidas"
      data-layer="hipoderme"
      aria-labelledby="duvidas-title"
      className="layer-hipo-1 pt-16 pb-32 lg:pt-28 lg:pb-44"
    >
      <div className="container-page grid-page gap-y-10">
        <div className="col-span-4 lg:col-span-4">
          <p className="kicker">Dúvidas</p>
          <h2 id="duvidas-title" className="mt-4">
            Dúvidas <em className="font-light text-(--accent-text)">frequentes</em>
          </h2>
          <p className="mt-5 text-cacau/90">
            <PendingMark label="respostas provisórias" flush />
          </p>
        </div>

        <div className="col-span-4 lg:col-span-7 lg:col-start-6">
          <FaqIsland items={items} idPrefix={ID_PREFIX} headingLevel={3}>
            <AccordionView items={items} open={[]} idPrefix={ID_PREFIX} headingLevel={3} />
          </FaqIsland>
        </div>
      </div>
    </section>
  );
}
