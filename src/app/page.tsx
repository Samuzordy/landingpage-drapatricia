import { About } from "@/components/sections/About";
import { Conditions } from "@/components/sections/Conditions";
import { Credentials } from "@/components/sections/Credentials";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pillars } from "@/components/sections/Pillars";
import { SkinJourney } from "@/components/sections/SkinJourney";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { getWhatsAppHref } from "@/lib/whatsapp";

// Server Component: composes the page in funnel order (attract → trust → understand → act).
// Commercial preview scope: Depoimentos, Conteúdo/Instagram and Locais are left out until the
// project is approved (their components remain for the production phase).
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
        {/* Epiderme */}
        <Hero />
        <Credentials />
        {/* Derme */}
        <About />
        <Pillars />
        <SkinJourney />
        <Conditions />
        {/* Derme profunda */}
        <HowItWorks />
        <Differentials />
        {/* Hipoderme */}
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      {fabHref && <WhatsAppFab href={fabHref} />}
    </>
  );
}
