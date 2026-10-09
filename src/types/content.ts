/**
 * Content model shared by the provisional content (src/content/site.ts) and,
 * from Etapa 7 on, by the Sanity queries.
 *
 * Type names are in English; field names follow the CMS schemas in section 09 of
 * docs/especificacao.pdf (Portuguese) so the Sanity migration needs no mapping layer.
 */

/** Marker for data the client has not sent yet. Never render it as real content. */
export type Placeholder = "PLACEHOLDER";

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Link = {
  label: string;
  href: string;
};

export type GoogleRating = {
  nota: number;
  total: number;
  url: string;
};

export type SiteSettings = {
  whatsapp: string | Placeholder;
  mensagemPadrao: string;
  instagram: { handle: string; url: string | Placeholder };
  email: string | Placeholder;
  seo: { title: string; description: string; ogImage?: ImageAsset };
  /** null until the client authorizes and sends the Google Business Profile link. */
  googleRating: GoogleRating | null;
};

export type TimelineItem = {
  /** Year or a label such as "hoje". */
  ano: string;
  titulo: string;
  descricao: string;
};

export type Institution = {
  nome: string;
  sigla: string;
  logo?: ImageAsset;
};

export type Specialist = {
  nome: string;
  nomeExibicao: string;
  especialidade: string;
  crm: string;
  rqe: string;
  idiomas: string[];
  foto?: ImageAsset;
  /** Detail texture revealed by the DermatoscopeLens. */
  fotoDetalhe?: ImageAsset;
  /** Plain paragraphs for now; becomes rich text (Portable Text) in Etapa 7. */
  bio: string[];
  timeline: TimelineItem[];
  instituicoes: Institution[];
  citacao: string;
};

export type PillarSlug = "clinica" | "cirurgica-prevencao" | "estetica";

export type Pillar = {
  titulo: string;
  slug: PillarSlug;
  resumo: string;
  mensagemChave: string;
  icone?: string;
  imagem?: ImageAsset;
  servicos: string[];
  ordem: number;
};

export type SkinLayerId = "epiderme" | "derme" | "hipoderme";

export type SkinLayer = {
  id: SkinLayerId;
  nome: string;
  /** 1 = most superficial. */
  profundidade: number;
  /** Short role from the spec's concept (section 04): "superfície", "estrutura", "base". */
  papel: string;
  descricao: string;
  /** true while the description is still provisional (needs medical review). */
  descricaoProvisoria?: boolean;
  /** References to Pillar.slug. */
  tratamentos: PillarSlug[];
};

export type Condition = {
  nome: string;
  /** Max 140 characters (validated in the CMS from Etapa 7). */
  quandoProcurar: string;
  pilar: PillarSlug;
  destaque: boolean;
};

export type ConsultationStep = {
  ordem: number;
  titulo: string;
  descricao: string;
};

export type DifferentialIcon =
  "escuta" | "evidencia" | "dermatoscopia" | "enderecos" | "idiomas" | "formacao";

export type Differential = {
  titulo: string;
  descricao: string;
  icone?: DifferentialIcon;
  /** Claim still depends on client confirmation (shows an "a validar" mark). */
  pendente?: boolean;
};

export type TestimonialSource = "Google" | "Doctoralia";

export type Testimonial = {
  /** First name only. */
  autor: string;
  texto: string;
  fonte: TestimonialSource;
  data: string;
  /** Only rendered when true (CFM 2.336/2023). */
  autorizado: boolean;
};

export type Faq = {
  pergunta: string;
  resposta: string;
  ordem: number;
};

export type OpeningHours = {
  dia: string;
  abre: string;
  fecha: string;
};

export type Location = {
  _id: string;
  bairro: string;
  clinica?: string;
  endereco: string;
  cep: string | Placeholder;
  /** null until real coordinates are confirmed — never guessed. */
  geo: { lat: number; lng: number } | null;
  horarios: OpeningHours[];
  convenios: string[];
  mapsUrl: string | Placeholder;
  ativo: boolean;
};

export type NavItem = {
  label: string;
  /** Section anchor, e.g. "#sobre". */
  href: `#${string}`;
};

export type HeroContent = {
  kicker: string;
  titulo: string;
  /** Words from `titulo` rendered in Fraunces italic. */
  destaqueItalico: string;
  subtitulo: string;
  ctaPrimario: string;
  ctaSecundario: Link;
  /** Short CTA label in the header. */
  ctaHeader: string;
};

export type Credential = {
  label: string;
  /** Still needs confirmation by the client (shows a "a validar" mark while flags allow). */
  pendente?: boolean;
};

export type SiteFlags = {
  /**
   * Shows small "a validar" marks next to unconfirmed data and placeholder notices
   * (e.g. Google badge, WhatsApp pending). Set to false before launch.
   */
  showPendingMarkers: boolean;
};

export type FinalCtaContent = {
  kicker: string;
  titulo: string;
  /** Words from `titulo` rendered in italic. */
  destaqueItalico: string;
  texto: string;
  ctaPrimario: string;
  ctaSecundario: Link;
};

export type SiteContent = {
  flags: SiteFlags;
  settings: SiteSettings;
  nav: NavItem[];
  hero: HeroContent;
  credentials: Credential[];
  specialist: Specialist;
  pillars: Pillar[];
  skinLayers: SkinLayer[];
  conditions: Condition[];
  consultationSteps: ConsultationStep[];
  differentials: Differential[];
  testimonials: Testimonial[];
  faqs: Faq[];
  locations: Location[];
  finalCta: FinalCtaContent;
};
