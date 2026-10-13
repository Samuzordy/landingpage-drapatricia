import { site } from "@/content/site";
import { resolveNav } from "@/lib/sections";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";
import { SiteHeader } from "./SiteHeader";

/**
 * Server wrapper: reads content and builds the nav/WhatsApp links on the server, so the client
 * header only receives plain props. Links to disabled sections are already filtered out.
 */
export function Header() {
  return (
    <SiteHeader
      brand={site.professional.displayName}
      tagline={site.professional.specialty}
      nav={resolveNav(site.nav.header)}
      cta={{
        label: site.hero.headerCta,
        href: getWhatsAppHref("header"),
        menuLabel: site.hero.primaryCta,
        menuHref: getWhatsAppHref("menu"),
        pendingNote: WHATSAPP_PENDING_NOTE,
      }}
    />
  );
}
