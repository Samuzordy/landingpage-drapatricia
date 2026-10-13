/**
 * WhatsApp links for every CTA (pre-filled message + UTM stating the origin).
 *
 * Safe by design: while the client's number is missing or invalid (`PLACEHOLDER` in
 * content/site.ts), every builder returns `null` and callers render the CTA in `pending` mode.
 * No fictitious number is ever linked. No personal data goes into the URL (LGPD).
 */
import { site } from "@/content/site";

/** Where the click came from — sent as utm_content to tell CTAs apart in analytics. */
export type WhatsAppPlacement = "header" | "menu" | "hero" | "conditions" | "fab" | "final-cta";

const BRAZIL_COUNTRY_CODE = "55";

/** 55 + area code (two digits, 1–9) + 8 digits (landline) or 9 + 8 digits (mobile). */
const BRAZIL_E164_DIGITS = /^55[1-9]{2}9?\d{8}$/;

const UTM = {
  utm_source: "site",
  utm_medium: "whatsapp",
  utm_campaign: "agendamento",
} as const;

/**
 * Normalizes a Brazilian number to the digits-only form wa.me expects (e.g. "5541999998888").
 * Accepts masks like "(41) 99999-8888" or "+55 41 ...". Returns null when invalid or pending.
 */
export function normalizeWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  const withCountry =
    digits.length === 10 || digits.length === 11 ? BRAZIL_COUNTRY_CODE + digits : digits;
  return BRAZIL_E164_DIGITS.test(withCountry) ? withCountry : null;
}

export type WhatsAppLinkOptions = {
  phone: string | null | undefined;
  message?: string;
  placement?: WhatsAppPlacement;
};

/** Builds `https://wa.me/<number>?text=...&utm_*`, or null when the number isn't usable. */
export function buildWhatsAppUrl({
  phone,
  message,
  placement,
}: WhatsAppLinkOptions): string | null {
  const number = normalizeWhatsAppNumber(phone);
  if (!number) return null;

  const params = new URLSearchParams();
  if (message?.trim()) params.set("text", message.trim());
  for (const [key, value] of Object.entries(UTM)) params.set(key, value);
  if (placement) params.set("utm_content", placement);
  // URLSearchParams encodes spaces as "+", which WhatsApp may keep literally; wa.me expects %20.
  // A real "+" in the message is already "%2B" at this point, so only spaces are affected.
  return `https://wa.me/${number}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Link for a given CTA using the site settings, or null while the number is pending. */
export function getWhatsAppHref(placement: WhatsAppPlacement): string | null {
  return buildWhatsAppUrl({
    phone: site.settings.whatsapp,
    message: site.settings.whatsappMessage,
    placement,
  });
}

export const isWhatsAppConfigured = normalizeWhatsAppNumber(site.settings.whatsapp) !== null;

/** Accessible explanation attached (aria-describedby) to CTAs in pending mode. */
export const WHATSAPP_PENDING_NOTE = site.settings.whatsappPendingNote;
