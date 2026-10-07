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
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Locations } from "@/components/sections/Locations";
import { Pillars } from "@/components/sections/Pillars";
import { SkinJourney } from "@/components/sections/SkinJourney";
import { Testimonials } from "@/components/sections/Testimonials";

// Server Component: composes the page in funnel order (attract → trust → understand → act).
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
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
        <Testimonials />
        <InstagramFeed />
        {/* Hipoderme */}
        <Faq />
        <Locations />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
