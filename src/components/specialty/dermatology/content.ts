/**
 * Content of the dermatology variant ("Jornada da Pele"). Lives next to the variant so the
 * template's main content (src/content/site.ts) stays specialty-neutral.
 *
 * Layer descriptions are minimal and purely positional (where each layer sits) — any clinical
 * or educational copy needs review by the professional before use.
 */
import type { ImageAsset, SectionHeading } from "@/types/content";

export type SkinLayerId = "epiderme" | "derme" | "hipoderme";

export type SkinLayer = {
  id: SkinLayerId;
  name: string;
  /** Short role: "superfície", "estrutura", "base". */
  role: string;
  description: string;
  /** true while the description still needs professional review (shows a mark if enabled). */
  pendingReview?: boolean;
  /** Titles of related service areas (free text); empty → `emptyRelated` is shown. */
  related: string[];
};

export const skinJourney = {
  heading: {
    kicker: "Jornada da pele",
    title: "Da superfície à profundidade",
    highlight: "profundidade",
    intro: "Selecione uma camada para conhecê-la.",
  } satisfies SectionHeading,
  tabsLabel: "Camadas da pele",
  relatedLabel: "Tratamentos relacionados",
  emptyRelated: "Em definição.",
  servicesLinkLabel: "Ver áreas de atuação",
  layers: [
    {
      id: "epiderme",
      name: "Epiderme",
      role: "superfície",
      description: "A camada mais externa da pele — a superfície que vemos e tocamos.",
      pendingReview: true,
      related: [],
    },
    {
      id: "derme",
      name: "Derme",
      role: "estrutura",
      description: "A camada intermediária, logo abaixo da epiderme.",
      pendingReview: true,
      related: [],
    },
    {
      id: "hipoderme",
      name: "Hipoderme",
      role: "base",
      description: "A camada mais profunda, abaixo da derme.",
      pendingReview: true,
      related: [],
    },
  ] satisfies SkinLayer[],
};

/**
 * Optional hero lens for dermatology projects ("lente dermatoscópica"). To use it, set in
 * site.ts: `hero.lens: { detail: skinDetailImage, label: "aumento 10x" }`.
 */
export const skinDetailImage: ImageAsset = {
  src: "/images/specialty/dermatology/skin-detail-illustrative.svg",
  // Revealed by the lens only; decorative, so it stays out of the accessibility tree.
  alt: "",
  width: 800,
  height: 1000,
};
