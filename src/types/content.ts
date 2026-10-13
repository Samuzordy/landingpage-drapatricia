/**
 * Content model of the landing template. Every project-specific value lives in
 * src/content/site.ts, typed by this file — components only read from it.
 */

/** Marker for data the client has not sent yet. Never render it as real content. */
export type Placeholder = "PLACEHOLDER";

export type ImageCrop = {
  /** Left edge of the visible region, as a fraction of the source width. */
  x: number;
  /** Top edge of the visible region, as a fraction of the source height. */
  y: number;
  /** Width of the visible region (fraction); the height follows the frame aspect ratio. */
  width: number;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Non-destructive visual crop (see lib/image.ts) — hides captions/logos baked into a photo. */
  crop?: ImageCrop;
  /** CSS object-position for uncropped images, e.g. "50% 30%" to keep a face in frame. */
  objectPosition?: string;
};

export type Link = {
  label: string;
  /** Section anchor ("#sobre") or URL. Anchors to disabled sections are hidden automatically. */
  href: string;
};

/** Sections the page can render. Toggle them in `site.sections`. */
export type SectionKey =
  | "hero"
  | "credentials"
  | "about"
  | "services"
  | "conditions"
  | "specialtyFeature"
  | "consultation"
  | "differentials"
  | "faq"
  | "finalCta";

export type SectionToggles = Record<SectionKey, boolean>;

/** Kicker + H2 (with optional italic highlight) + optional intro — shared by most sections. */
export type SectionHeading = {
  kicker: string;
  title: string;
  /** Words from `title` rendered in Fraunces italic. */
  highlight?: string;
  intro?: string;
};

export type NavEntry = {
  section: SectionKey;
  label: string;
};

export type NavItem = {
  label: string;
  /** Section anchor, e.g. "#sobre". */
  href: `#${string}`;
};

export type SiteFlags = {
  /**
   * Shows small "a validar" marks next to unconfirmed data and placeholder notices.
   * Keep false for commercial previews.
   */
  showPendingMarkers: boolean;
};

export type GoogleRating = {
  rating: number;
  total: number;
  url: string;
};

export type SocialLink = {
  /** Network name shown before the handle, e.g. "Instagram". */
  label: string;
  handle: string;
  url: string | Placeholder;
};

export type SiteSettings = {
  /** Browser UI color (mobile address bar). Usually the light background token. */
  themeColor: string;
  whatsapp: string | Placeholder;
  whatsappMessage: string;
  /** Shown under WhatsApp CTAs while the number is a placeholder. */
  whatsappPendingNote: string;
  social: SocialLink[];
  seo: { title: string; description: string };
  /** null until the client authorizes and sends the Google Business Profile link. */
  googleRating: GoogleRating | null;
};

export type Professional = {
  /** Full legal name. */
  name: string;
  /** Name used across the page, e.g. "Dra. Nome Sobrenome". */
  displayName: string;
  /** Professional title shown under the name in About, e.g. "Médica especialista". */
  title: string;
  /** Short specialty label: header tagline, hero kicker, footer. */
  specialty: string;
  /** Council registrations: CRM/RQE (medicine), CRO, CRP, CRN, CREFITO… Always visible. */
  registrations: string[];
  /** "Cidade – UF". */
  location: string;
  languages: string[];
};

export type SiteImages = {
  /** Hero portrait — the LCP image (preloaded). */
  hero: ImageAsset;
  /** About portrait (lazy-loaded). */
  about: ImageAsset;
};

export type HeroContent = {
  kicker: string;
  title: string;
  /** Words from `title` rendered in italic. */
  highlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: Link;
  /** Short CTA label in the header. */
  headerCta: string;
  /**
   * Optional magnifier lens over the hero portrait, revealing `detail` (e.g. a texture or
   * close-up). null = plain portrait.
   */
  lens: { detail: ImageAsset; label: string } | null;
};

export type Credential = {
  label: string;
  /** Still needs confirmation (shows a mark while flags allow). */
  pending?: boolean;
};

export type TimelineItem = {
  /** Year or a label such as "hoje". */
  year: string;
  title: string;
  description?: string;
};

export type Institution = {
  name: string;
  /** Monogram shown in the circle. */
  abbreviation: string;
};

export type AboutFact = {
  term: string;
  detail: string;
  /** Bold, tabular (used for registrations). */
  emphasis?: boolean;
  pending?: boolean;
};

export type AboutContent = {
  kicker: string;
  bio: string[];
  facts: AboutFact[];
  timelineTitle: string;
  timeline: TimelineItem[];
  institutionsTitle: string;
  institutions: Institution[];
  /** Signature quote; empty string hides it. */
  quote: string;
};

/** Decorative line-art on the expanded service card. */
export type ServiceArt = "rings" | "reticle" | "waves";

export type ServiceArea = {
  title: string;
  /** Stable id — used in element ids and referenced by conditions. */
  slug: string;
  keyMessage: string;
  services: string[];
  art?: ServiceArt;
};

export type ServicesContent = {
  heading: SectionHeading;
  items: ServiceArea[];
};

export type ConditionItem = {
  name: string;
  /** Max ~140 characters. */
  whenToSeek: string;
  /** ServiceArea.slug shown as "related area" in the bottom sheet. */
  service?: string;
};

export type ConditionsContent = {
  heading: SectionHeading;
  /** Accessible name of the chip list. */
  listLabel: string;
  sheetKicker: string;
  relatedLabel: string;
  disclaimer: string;
  /** Hint shown while an item's text is still PENDING_TEXT. */
  pendingHint: string;
  items: ConditionItem[];
};

export type ConsultationStep = {
  title: string;
  description: string;
};

export type ConsultationContent = {
  heading: SectionHeading;
  steps: ConsultationStep[];
};

export type DifferentialIcon =
  "listening" | "evidence" | "precision" | "locations" | "languages" | "education";

export type Differential = {
  title: string;
  description: string;
  icon?: DifferentialIcon;
  pending?: boolean;
};

export type DifferentialsContent = {
  heading: SectionHeading;
  items: Differential[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  heading: SectionHeading;
  items: FaqItem[];
};

export type FinalCtaContent = {
  kicker: string;
  title: string;
  highlight: string;
  text: string;
  primaryCta: string;
  /** Optional second button (e.g. "Conheça a Dra."). */
  secondaryCta?: Link;
};

export type FooterContent = {
  navTitle: string;
  infoTitle: string;
  /** Empty string hides it. */
  privacyLabel: string;
  /** Agency/author credit on the bottom line. Empty string hides it. */
  credit: string;
};

/**
 * Optional themed section (see src/components/specialty/). "none" removes it from the page,
 * the nav and the depth gradient.
 */
export type SpecialtyVariant = "none" | "dermatology-skin-journey";

export type SiteContent = {
  flags: SiteFlags;
  sections: SectionToggles;
  settings: SiteSettings;
  professional: Professional;
  images: SiteImages;
  nav: { header: NavEntry[]; footer: NavEntry[] };
  hero: HeroContent;
  credentials: { label: string; items: Credential[] };
  about: AboutContent;
  services: ServicesContent;
  conditions: ConditionsContent;
  specialtyFeature: { variant: SpecialtyVariant };
  consultation: ConsultationContent;
  differentials: DifferentialsContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  footer: FooterContent;
};
