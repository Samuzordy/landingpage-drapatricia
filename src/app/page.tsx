import type { ComponentType } from "react";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { WhenToSeek } from "@/components/sections/WhenToSeek";
import { SpecialtyFeature } from "@/components/specialty/SpecialtyFeature";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { isSectionEnabled } from "@/lib/sections";
import { getWhatsAppHref } from "@/lib/whatsapp";
import type { SectionKey } from "@/types/content";

/**
 * Page order (attract → trust → understand → act). Each entry renders only when enabled in
 * `site.sections` (src/content/site.ts). If you reorder, mirror the order in BANDED_SECTIONS
 * (lib/sections.ts) so the background depth gradient follows.
 */
const SECTIONS: [SectionKey, ComponentType][] = [
  ["hero", Hero],
  ["credentials", Credentials],
  ["about", About],
  ["services", Services],
  ["conditions", WhenToSeek],
  ["specialtyFeature", SpecialtyFeature],
  ["consultation", HowItWorks],
  ["differentials", Differentials],
  ["faq", Faq],
  ["finalCta", FinalCta],
];

// Server Component. Header and footer are always present.
export default function HomePage() {
  // Floating WhatsApp button only once a real number is configured (no fictitious link).
  const fabHref = getWhatsAppHref("fab");

  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo-principal" tabIndex={-1} className="outline-none">
        {SECTIONS.filter(([key]) => isSectionEnabled(key)).map(([key, Section]) => (
          <Section key={key} />
        ))}
      </main>
      <Footer />
      {fabHref && <WhatsAppFab href={fabHref} />}
    </>
  );
}
