import type { CSSProperties } from "react";
import { site } from "@/content/site";
import type { NavEntry, NavItem, SectionKey } from "@/types/content";

/** Anchor of each section (null = not linkable). */
export const SECTION_ANCHORS: Record<SectionKey, string | null> = {
  hero: "inicio",
  credentials: null,
  about: "sobre",
  services: "atuacao",
  conditions: "quando-procurar",
  specialtyFeature: "destaque",
  consultation: "consulta",
  differentials: "diferenciais",
  faq: "duvidas",
  finalCta: "agendar",
};

/** On in `site.sections` — and, for the specialty feature, a variant is selected. */
export function isSectionEnabled(key: SectionKey): boolean {
  if (!site.sections[key]) return false;
  if (key === "specialtyFeature") return site.specialtyFeature.variant !== "none";
  return true;
}

/** "#anchor" of an enabled section, or null. */
export function sectionHref(key: SectionKey): `#${string}` | null {
  const anchor = SECTION_ANCHORS[key];
  return anchor && isSectionEnabled(key) ? `#${anchor}` : null;
}

/** Nav entries whose section is enabled, resolved to anchors. */
export function resolveNav(entries: NavEntry[]): NavItem[] {
  return entries.flatMap(({ section, label }) => {
    const href = sectionHref(section);
    return href ? [{ label, href }] : [];
  });
}

/**
 * Keeps a configured link only if it still has a target: anchors pointing to a disabled
 * section return null (the caller hides the link). External URLs and unknown anchors pass.
 */
export function resolveHref(href: string): string | null {
  if (!href.startsWith("#")) return href;
  const key = (Object.keys(SECTION_ANCHORS) as SectionKey[]).find(
    (k) => SECTION_ANCHORS[k] === href.slice(1),
  );
  return key && !isSectionEnabled(key) ? null : href;
}

/* ---------- Depth gradient ----------
 * The page "deepens" from the light surface (Hero) to the dark base (final CTA, footer).
 * The light → deep stretch is split into 7 steps (--depth-0 … --depth-7, globals.css) and
 * spread over whichever of these sections are enabled, so each section starts exactly where
 * the previous one ends — no seams when a section is switched off.
 */
const BANDED_SECTIONS: SectionKey[] = [
  "about",
  "services",
  "specialtyFeature",
  "conditions",
  "consultation",
  "differentials",
  "faq",
];
const DEPTH_STEPS = 7;
/** From this step on, small accent text switches to the deep variant to keep ≥ 4.5:1. */
const DEEP_FROM_STEP = 5;

export type BandProps = {
  "data-band": "mid" | "deep";
  style: CSSProperties;
};

/** Background band of a section (spread on its root element, together with `depth-band`). */
export function bandProps(key: SectionKey): BandProps {
  const enabled = BANDED_SECTIONS.filter(isSectionEnabled);
  const index = Math.max(0, enabled.indexOf(key));
  const count = Math.max(1, enabled.length);
  const from = Math.round((index * DEPTH_STEPS) / count);
  const to = Math.round(((index + 1) * DEPTH_STEPS) / count);
  return {
    "data-band": to >= DEEP_FROM_STEP ? "deep" : "mid",
    style: {
      "--band-from": `var(--depth-${from})`,
      "--band-to": `var(--depth-${to})`,
    } as CSSProperties,
  };
}
