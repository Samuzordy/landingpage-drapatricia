import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPending, site } from "@/content/site";
import { bandProps, sectionHref } from "@/lib/sections";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";
import { ConditionChipList, type ConditionChipItem } from "./ConditionChipList";
import { WhenToSeekIsland } from "./WhenToSeekIsland";

/**
 * Quando procurar (#quando-procurar). Server Component. Chips ship as static HTML; tooltip +
 * bottom sheet are lazy-loaded near the viewport (WhenToSeekIsland).
 */
export function WhenToSeek() {
  const { conditions, services, hero } = site;
  const serviceTitles = Object.fromEntries(services.items.map((s) => [s.slug, s.title]));
  const anyPending = conditions.items.some((c) => isPending(c.whenToSeek));
  const items: ConditionChipItem[] = conditions.items.map((c) => ({
    name: c.name,
    hint: isPending(c.whenToSeek) ? conditions.pendingHint : c.whenToSeek,
    hintPending: isPending(c.whenToSeek),
    related: (c.service && serviceTitles[c.service]) || "",
  }));

  return (
    <section
      id="quando-procurar"
      aria-labelledby="quando-procurar-title"
      {...bandProps("conditions")}
      className="section-space depth-band"
    >
      <div className="container-page grid-page gap-y-10">
        <SectionHeading
          heading={conditions.heading}
          titleId="quando-procurar-title"
          pendingLabel={anyPending ? "textos em revisão" : undefined}
          className="col-span-4 lg:col-span-5"
        />

        <div className="col-span-4 lg:col-span-7 lg:pt-3">
          <WhenToSeekIsland
            items={items}
            listLabel={conditions.listLabel}
            labels={{
              sheetKicker: conditions.sheetKicker,
              related: conditions.relatedLabel,
              disclaimer: conditions.disclaimer,
            }}
            // Only linked when the services section is on the page.
            relatedHref={sectionHref("services")}
            whatsapp={{
              label: hero.primaryCta,
              href: getWhatsAppHref("conditions"),
              pendingNote: WHATSAPP_PENDING_NOTE,
            }}
            showPendingMarkers={site.flags.showPendingMarkers}
          >
            <ConditionChipList items={items} listLabel={conditions.listLabel} />
          </WhenToSeekIsland>
        </div>
      </div>
    </section>
  );
}
