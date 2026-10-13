/**
 * Content of the commercial preview for Dra. Patricia Martinski (dermatology, Curitiba – PR).
 *
 * Facts come only from public sources (Doctoralia, Hospital IPO): name, CRM/RQE, city, PUCPR,
 * SBD specialist title, conditions and procedures listed there. Everything else is neutral,
 * institutional copy — no personal claims.
 *   - `// TEMPLATE:`      → value expected to change in every project.
 *   - `// TODO(cliente)`  → data the client still has to send (keep PLACEHOLDER meanwhile).
 *
 * Never invent testimonials, patient counts, ratings, years of experience or phone numbers.
 * Copy must follow the professional council's advertising rules (for physicians, CFM
 * 2.336/2023): no superlatives, promises of results, prices or promotions.
 */
import type { SiteContent } from "@/types/content";

export const PLACEHOLDER = "PLACEHOLDER" as const;

/** Marker for copy the client still has to write or approve (rendered as hidden/omitted). */
export const PENDING_TEXT = "[Texto pendente — aguardando validação]";

/** True while a text field still holds the pending placeholder. */
export const isPending = (text: string | undefined | null): boolean =>
  !text || text === PENDING_TEXT;

// Identity used across the page (header, hero, about, final CTA, footer, SEO).
const professional = {
  name: "Patricia Martinski",
  displayName: "Dra. Patricia Martinski",
  title: "Dermatologista",
  specialty: "Dermatologia clínica, cirúrgica e estética",
  registrations: ["CRM-PR 17877", "RQE 23981"],
  location: "Curitiba – PR",
  languages: [], // no public information — left empty on purpose
};

export const site: SiteContent = {
  // Pending marks stay hidden in commercial previews (true shows "a validar" tags).
  flags: { showPendingMarkers: false },

  // Nav links, CTAs pointing to a disabled section and the background depth gradient adapt
  // automatically.
  sections: {
    hero: true,
    credentials: true,
    about: true,
    services: true,
    conditions: true,
    specialtyFeature: true,
    consultation: true,
    differentials: true,
    faq: true,
    finalCta: true,
  },

  settings: {
    themeColor: "#f6f4ec", // same as --color-porcelana (tokens.css)
    whatsapp: PLACEHOLDER, // TODO(cliente): WhatsApp oficial — CTAs ficam "em breve" até lá
    whatsappMessage: "Olá, vim pelo site e gostaria de agendar uma consulta dermatológica.",
    whatsappPendingNote: "Canal de agendamento disponível em breve.",
    social: [], // TODO(cliente): Instagram oficial, se ela quiser exibir
    seo: {
      title: `${professional.displayName} | ${professional.title} em ${professional.location}`,
      description: `${professional.specialty} em ${professional.location} com ${professional.displayName}. ${professional.registrations.join(" · ")}.`,
    },
    googleRating: null, // TODO(cliente): somente com autorização
  },

  professional,

  // About keeps the neutral placeholder until a second photo arrives (never reuse the hero one).
  // To switch: { src: "/images/patricia-sobre.jpg", alt: professional.displayName,
  //              width: …, height: …, objectPosition: "50% 30%" }
  images: {
    // Square 512×511 export from her Instagram (TODO(cliente): original in higher resolution).
    // Cover fills the 4:5 arch by height and trims ~10% per side; the face sits at ~53%.
    hero: {
      src: "/images/patricia-hero.jpg",
      alt: `Retrato da ${professional.displayName}`,
      width: 512,
      height: 511,
      objectPosition: "53% 50%",
    },
    about: {
      src: "/images/placeholders/professional-about-placeholder.svg",
      alt: `${professional.displayName} em seu consultório`,
      width: 800,
      height: 1000,
      objectPosition: "50% 30%",
    },
  },

  // Links whose section is disabled are dropped automatically.
  nav: {
    header: [
      { section: "about", label: "Sobre" },
      { section: "services", label: "Atuação" },
      { section: "specialtyFeature", label: "Jornada da pele" },
      { section: "consultation", label: "Consulta" },
      { section: "faq", label: "Dúvidas" },
    ],
    footer: [
      { section: "about", label: "Sobre" },
      { section: "services", label: "Áreas de atuação" },
      { section: "conditions", label: "Quando procurar" },
      { section: "specialtyFeature", label: "Jornada da pele" },
      { section: "consultation", label: "Consulta" },
      { section: "differentials", label: "Diferenciais" },
      { section: "faq", label: "Dúvidas" },
    ],
  },

  hero: {
    kicker: `${professional.title} · ${professional.location}`,
    title: "Cuidado dermatológico em cada fase da sua pele.",
    highlight: "sua pele",
    subtitle:
      "Dermatologia clínica, cirúrgica e estética, com atenção à saúde, à prevenção e às necessidades individuais de cada paciente.",
    primaryCta: "Agendar consulta",
    secondaryCta: { label: "Conheça a Dra.", href: "#sobre" },
    headerCta: "Agendar",
    // Off for this landing: with a real portrait the lens would pass over her face. The starter
    // option stays available ({ detail: skinDetailImage, label } from specialty/dermatology).
    lens: null,
  },

  // Registrations already sit right above (hero caption) — kept out of the marquee.
  credentials: {
    label: "Credenciais",
    items: [
      { label: "Dermatologia" },
      { label: "Especialista pela Sociedade Brasileira de Dermatologia" },
      { label: "Formação pela PUCPR" },
      { label: professional.location },
    ],
  },

  about: {
    kicker: "Um olhar completo para a saúde da pele",
    bio: [
      `A ${professional.displayName} é médica dermatologista, com formação pela Pontifícia Universidade Católica do Paraná e título de especialista pela Sociedade Brasileira de Dermatologia. Sua atuação contempla o cuidado dermatológico em diferentes necessidades, do diagnóstico e acompanhamento clínico aos procedimentos dermatológicos.`,
      "A dermatologia permite acompanhar a pele em diferentes fases da vida, atuando tanto na prevenção quanto no tratamento de alterações da pele, dos cabelos e do couro cabeludo.",
    ],
    facts: [
      { term: "Registro", detail: professional.registrations.join(" · "), emphasis: true },
      { term: "Formação", detail: "Pontifícia Universidade Católica do Paraná (PUCPR)" },
      { term: "Título", detail: "Especialista pela Sociedade Brasileira de Dermatologia" },
      { term: "Atendimento", detail: professional.location },
    ],
    // No public dates or extra institutions — empty lists/quote hide these blocks.
    timelineTitle: "Linha do tempo",
    timeline: [],
    institutionsTitle: "Instituições",
    institutions: [],
    quote: "",
  },

  services: {
    heading: {
      kicker: "Atuação",
      title: "Áreas de atuação",
      highlight: "atuação",
      intro:
        "Dermatologia completa: saúde da pele, prevenção, diagnóstico e tratamentos dermatológicos.",
    },
    items: [
      {
        title: "Dermatologia clínica",
        slug: "clinica",
        keyMessage: "Avaliação, diagnóstico e acompanhamento da pele ao longo da vida.",
        art: "rings",
        services: [
          "Consulta dermatológica",
          "Acne",
          "Melasma",
          "Manchas e alterações da pele",
          "Avaliação preventiva da pele",
        ],
      },
      {
        title: "Cabelos e couro cabeludo",
        slug: "cabelos",
        keyMessage: "Investigação de alterações como queda de cabelo e alopecias.",
        art: "waves",
        services: ["Queda de cabelo", "Alopecias", "Doenças do cabelo e do couro cabeludo"],
      },
      {
        title: "Dermatologia cirúrgica",
        slug: "cirurgica",
        keyMessage: "Avaliação de lesões cutâneas e procedimentos quando indicados.",
        art: "reticle",
        services: [
          "Biópsia de pele",
          "Crioterapia",
          "Crioterapia de verrugas",
          "Cirurgia de câncer de pele",
        ],
      },
      {
        title: "Dermatologia estética",
        slug: "estetica",
        keyMessage:
          "Procedimentos dermatológicos voltados ao cuidado e ao rejuvenescimento da pele.",
        art: "rings",
        services: [
          "Peeling",
          "Rejuvenescimento facial",
          "Preenchimento facial",
          "Aplicação de toxina botulínica",
        ],
      },
    ],
  },

  conditions: {
    heading: {
      kicker: "Quando procurar",
      title: "Quando procurar um dermatologista",
      highlight: "dermatologista",
      intro:
        "Situações em que uma avaliação dermatológica pode ajudar. Toque ou passe o cursor sobre um item para saber mais.",
    },
    listLabel: "Motivos para buscar avaliação dermatológica",
    sheetKicker: "Quando procurar",
    relatedLabel: "Área relacionada",
    disclaimer: "Informação geral, de caráter educativo. Não substitui a avaliação médica.",
    pendingHint: "Orientação sobre quando procurar atendimento em revisão.",
    items: [
      {
        name: "Acne",
        whenToSeek:
          "Espinhas persistentes, inflamadas ou que deixam marcas podem ser avaliadas para orientar o cuidado de cada caso.",
        service: "clinica",
      },
      {
        name: "Melasma",
        whenToSeek:
          "Manchas acastanhadas no rosto, que costumam se intensificar com o sol, merecem avaliação e acompanhamento.",
        service: "clinica",
      },
      {
        name: "Queda de cabelo",
        whenToSeek:
          "Queda acima do habitual, ou que se prolonga por semanas, é um motivo para investigar as possíveis causas.",
        service: "cabelos",
      },
      {
        name: "Alopecia",
        whenToSeek:
          "Falhas no couro cabeludo, afinamento dos fios ou perda localizada pedem avaliação para entender a alteração.",
        service: "cabelos",
      },
      {
        name: "Alterações nas unhas",
        whenToSeek:
          "Mudanças de cor, espessura ou formato das unhas também fazem parte da avaliação dermatológica.",
        service: "clinica",
      },
      {
        name: "Manchas na pele",
        whenToSeek:
          "Manchas que surgiram há pouco ou mudaram de cor e tamanho podem ser avaliadas com o exame da pele.",
        service: "clinica",
      },
      {
        name: "Lesões ou sinais que mudam",
        whenToSeek:
          "Pintas ou lesões que crescem, mudam de cor ou formato, coçam ou sangram devem ser avaliadas.",
        service: "cirurgica",
      },
      {
        name: "Avaliação preventiva da pele",
        whenToSeek:
          "Mesmo sem queixas, o exame periódico ajuda a acompanhar pintas e sinais ao longo do tempo.",
        service: "clinica",
      },
    ],
  },

  // Variant content (layers, lens image) lives in components/specialty/dermatology/content.ts.
  specialtyFeature: { variant: "dermatology-skin-journey" },

  consultation: {
    heading: {
      kicker: "Consulta",
      title: "Como funciona a consulta",
      highlight: "consulta",
      intro: "Três etapas para entender, avaliar e planejar o cuidado com a sua pele.",
    },
    steps: [
      {
        title: "Entender",
        description: "Conversa sobre a queixa, o histórico e os objetivos da consulta.",
      },
      {
        title: "Avaliar",
        description: "Exame dermatológico e avaliação das características individuais.",
      },
      {
        title: "Planejar",
        description:
          "Definição das possibilidades de acompanhamento ou tratamento, conforme indicação médica.",
      },
    ],
  },

  // Traits of dermatological care itself — not personal claims about the professional.
  differentials: {
    heading: {
      kicker: "Diferenciais",
      title: "O cuidado dermatológico de forma ampla",
      highlight: "de forma ampla",
    },
    items: [
      {
        title: "Visão ampla da dermatologia",
        description:
          "Clínica, cirurgia dermatológica, cabelos e cuidados estéticos reunidos em uma mesma especialidade.",
        icon: "evidence",
      },
      {
        title: "Acompanhamento individual",
        description: "Cada pele apresenta características e necessidades diferentes.",
        icon: "listening",
      },
      {
        title: "Prevenção e cuidado contínuo",
        description:
          "A consulta dermatológica também pode fazer parte da rotina preventiva de saúde.",
        icon: "precision",
      },
    ],
  },

  faq: {
    heading: { kicker: "Dúvidas", title: "Dúvidas frequentes", highlight: "frequentes" },
    items: [
      {
        question: "Quando devo procurar um dermatologista?",
        answer:
          "Sempre que houver alterações na pele, nos cabelos ou nas unhas que incomodem ou persistam, e também para o acompanhamento preventivo da pele. Pintas ou sinais que mudam de aspecto merecem atenção especial.",
      },
      {
        question: "O dermatologista também avalia cabelos e couro cabeludo?",
        answer:
          "Sim. Cabelos, couro cabeludo e unhas fazem parte da dermatologia. Queda de cabelo, alopecias e outras alterações do couro cabeludo podem ser investigadas em consulta.",
      },
      {
        question: "Como funciona a primeira consulta?",
        answer:
          "A consulta começa com uma conversa sobre a queixa, o histórico de saúde e os objetivos. Em seguida é feito o exame dermatológico e, ao final, são apresentadas as possibilidades de acompanhamento ou tratamento. Se tiver exames ou receitas anteriores, vale levá-los.",
      },
      {
        question: "É possível realizar procedimentos durante a consulta?",
        answer:
          "Depende de cada caso. A disponibilidade e a indicação de procedimentos são definidas após avaliação médica.",
      },
      {
        question: "Como faço para agendar?",
        answer:
          "Pelo botão “Agendar consulta”, nesta página. No contato, são informadas as opções de data, horário e local de atendimento.",
      },
    ],
  },

  finalCta: {
    kicker: "Agendamento",
    title: "Seu cuidado com a pele pode começar por uma avaliação.",
    highlight: "uma avaliação",
    text: "Agende uma consulta dermatológica e converse com a especialista sobre as necessidades da sua pele.",
    primaryCta: "Agendar consulta",
  },

  footer: {
    navTitle: "Navegação",
    infoTitle: "Redes e informações",
    privacyLabel: "", // empty hides it (no policy page in this preview)
    credit: "Desenvolvido por Samuel Faria",
  },
};
