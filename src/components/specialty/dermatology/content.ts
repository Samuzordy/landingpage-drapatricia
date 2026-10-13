/**
 * Content of the dermatology variant ("Jornada da Pele"). Lives next to the variant so the
 * template's main content (src/content/site.ts) stays specialty-neutral.
 *
 * Layer copy is short, general and non-clinical (role of each layer) — still to be reviewed by
 * the professional before going live (`pendingReview`).
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
    intro: "Cada camada tem um papel no cuidado com a pele. Selecione uma para conhecê-la.",
  } satisfies SectionHeading,
  tabsLabel: "Camadas da pele",
  relatedLabel: "Áreas relacionadas",
  emptyRelated: "Em definição.",
  servicesLinkLabel: "Ver áreas de atuação",
  // Related entries mirror the service area titles in site.ts.
  layers: [
    {
      id: "epiderme",
      name: "Epiderme",
      role: "proteção",
      description:
        "A camada mais externa: protege o organismo e está em contato direto com o ambiente, como o sol, o clima e os cosméticos.",
      pendingReview: true,
      related: ["Dermatologia clínica", "Dermatologia estética"],
    },
    {
      id: "derme",
      name: "Derme",
      role: "estrutura",
      description:
        "Dá estrutura e sustentação à pele. Abriga fibras, vasos e anexos como os folículos dos cabelos e as glândulas.",
      pendingReview: true,
      related: ["Dermatologia clínica", "Cabelos e couro cabeludo", "Dermatologia cirúrgica"],
    },
    {
      id: "hipoderme",
      name: "Hipoderme",
      role: "profundidade",
      description:
        "A camada mais profunda integra a pele às estruturas abaixo dela. Olhar para o conjunto das camadas faz parte de uma avaliação individualizada.",
      pendingReview: true,
      related: ["Dermatologia cirúrgica", "Dermatologia estética"],
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
