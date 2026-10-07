import { site } from "@/content/site";
import { WHATSAPP_PENDING_NOTE, getWhatsAppHref } from "@/lib/whatsapp";
import { SiteHeader } from "./SiteHeader";

/**
 * Server wrapper: reads content and builds the WhatsApp links on the server, so the client
 * header only receives plain props.
 */
export function Header() {
  return (
    <SiteHeader
      brand={site.specialist.nomeExibicao}
      tagline={site.specialist.especialidade}
      nav={site.nav}
      cta={{
        label: site.hero.ctaHeader,
        href: getWhatsAppHref("header"),
        menuLabel: site.hero.ctaPrimario,
        menuHref: getWhatsAppHref("menu"),
        pendingNote: WHATSAPP_PENDING_NOTE,
      }}
    />
  );
}
