/**
 * TEMPLATE — the single file to edit when starting a new landing.
 *
 * Everything below is DEMO content: fictitious name, registrations, city, institutions and
 * copy. Replace it with the new professional's data before showing the preview.
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

// TEMPLATE: identity used across the page (header, hero, about, final CTA, footer, SEO).
const professional = {
  name: "Nome Sobrenome",
  displayName: "Dra. Nome Sobrenome",
  title: "Médica especialista",
  specialty: "Especialidade médica",
  registrations: ["CRM-UF 00000", "RQE 00000"],
  location: "Cidade – UF",
  languages: ["Português", "Inglês"],
};

export const site: SiteContent = {
  // Pending marks stay hidden in commercial previews (true shows "a validar" tags).
  flags: { showPendingMarkers: false },

  // TEMPLATE: turn sections on/off. Nav links, CTAs pointing to a disabled section and the
  // background depth gradient adapt automatically.
  sections: {
    hero: true,
    credentials: true,
    about: true,
    services: true,
    conditions: true,
    specialtyFeature: false, // also needs `specialtyFeature.variant` below
    consultation: true,
    differentials: true,
    faq: true,
    finalCta: true,
  },

  settings: {
    themeColor: "#f7f1ec", // TEMPLATE: same as --color-porcelana (tokens.css)
    whatsapp: PLACEHOLDER, // TODO(cliente): WhatsApp comercial — CTAs ficam "em breve" até lá
    whatsappMessage: "Olá, vim pelo site e gostaria de agendar uma consulta.",
    whatsappPendingNote: "Agendamento pelo WhatsApp disponível em breve.",
    social: [
      // TODO(cliente): perfil real; sem URL o handle aparece sem link
      { label: "Instagram", handle: "@nome.sobrenome", url: PLACEHOLDER },
    ],
    seo: {
      title: `${professional.specialty} em ${professional.location} | ${professional.displayName}`,
      description: `Atendimento em ${professional.specialty.toLowerCase()} em ${professional.location} com ${professional.displayName}. ${professional.registrations.join(" · ")}.`,
    },
    googleRating: null, // TODO(cliente): nota, total e link do Google (somente com autorização)
  },

  professional,

  // TEMPLATE: replace the files in public/images/ (keep the 4:5 portrait ratio).
  images: {
    hero: {
      src: "/images/placeholders/professional-hero-placeholder.svg",
      alt: `Retrato de ${professional.displayName}`,
      width: 800,
      height: 1000,
      // For photos with text/logos around the subject, crop visually instead of editing:
      // crop: { x: 0.27, y: 0, width: 0.5 },
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
      { section: "consultation", label: "Consulta" },
      { section: "faq", label: "Dúvidas" },
    ],
    footer: [
      { section: "about", label: "Sobre" },
      { section: "services", label: "Atuação" },
      { section: "specialtyFeature", label: "Destaque" },
      { section: "conditions", label: "Quando procurar" },
      { section: "consultation", label: "Consulta" },
      { section: "differentials", label: "Diferenciais" },
      { section: "faq", label: "Dúvidas" },
    ],
  },

  hero: {
    kicker: `${professional.specialty} · ${professional.location}`,
    title: "Cuidado atento à sua saúde, guiado pela ciência",
    highlight: "sua saúde",
    subtitle:
      "Atendimento com escuta, avaliação criteriosa e um plano construído junto com você, em cada etapa do cuidado.",
    primaryCta: "Agendar pelo WhatsApp",
    secondaryCta: { label: "Conheça a Dra.", href: "#sobre" },
    headerCta: "Agendar",
    // Optional magnifier lens over the portrait (see README › SpecialtyFeature for the
    // dermatology example). null = plain portrait.
    lens: null,
  },

  credentials: {
    label: "Credenciais",
    items: [
      ...professional.registrations.map((label) => ({ label })),
      { label: "Título de especialista" },
      { label: "Formação em Medicina" },
      { label: "Membro de sociedade de especialidade" },
      { label: "English spoken" },
    ],
  },

  about: {
    kicker: "Sobre a especialista",
    bio: [
      `Sou ${professional.title.toLowerCase()} em ${professional.specialty.toLowerCase()} e atendo em ${professional.location}.`,
      "Meu trabalho combina escuta atenta, avaliação criteriosa e decisões tomadas em conjunto com cada paciente, com explicações claras em todas as etapas.",
      `Atendo em ${professional.languages.join(" e ").toLowerCase()}.`,
    ],
    facts: [
      { term: "Registro", detail: professional.registrations.join(" · "), emphasis: true },
      { term: "Formação", detail: "Medicina — Universidade Exemplo" },
      { term: "Especialização", detail: "Residência em Especialidade — Hospital Exemplo" },
      { term: "Título", detail: "Título de especialista — Sociedade de Especialidade" },
      { term: "Idiomas", detail: professional.languages.join(" e ") },
    ],
    timelineTitle: "Linha do tempo",
    // TEMPLATE: demo milestones and years
    timeline: [
      { year: "2008", title: "Graduação em Medicina — Universidade Exemplo" },
      { year: "2012", title: "Residência em Especialidade — Hospital Exemplo" },
      { year: "2014", title: "Título de especialista — Sociedade de Especialidade" },
      { year: "hoje", title: `Atendimento em ${professional.location}` },
    ],
    institutionsTitle: "Instituições",
    institutions: [
      { name: "Universidade Exemplo", abbreviation: "UE" },
      { name: "Hospital Exemplo", abbreviation: "HE" },
      { name: "Sociedade de Especialidade", abbreviation: "SE" },
    ],
    quote: "Cada pessoa chega com uma história. O cuidado começa por ouvi-la.",
  },

  services: {
    heading: {
      kicker: "Atuação",
      title: "Áreas de atuação",
      highlight: "atuação",
      intro: "Do primeiro diagnóstico ao acompanhamento contínuo.",
    },
    items: [
      {
        title: "Avaliação e diagnóstico",
        slug: "avaliacao",
        keyMessage: "Entender antes de tratar.",
        art: "rings",
        services: [
          "Consulta inicial completa",
          "Revisão de histórico e exames anteriores",
          "Exame clínico detalhado",
          "Solicitação e interpretação de exames",
          "Segunda opinião",
        ],
      },
      {
        title: "Tratamento e acompanhamento",
        slug: "tratamento",
        keyMessage: "Um plano pensado para a sua rotina.",
        art: "reticle",
        services: [
          "Plano de tratamento individual",
          "Ajustes conforme a evolução",
          "Retornos programados",
          "Acompanhamento de condições crônicas",
          "Orientação para familiares",
        ],
      },
      {
        title: "Prevenção e orientação",
        slug: "prevencao",
        keyMessage: "Cuidar antes que incomode.",
        art: "waves",
        services: [
          "Check-up preventivo",
          "Rastreamento conforme idade e histórico",
          "Orientação sobre hábitos e autocuidado",
          "Educação em saúde",
          "Encaminhamentos quando necessário",
        ],
      },
    ],
  },

  conditions: {
    heading: {
      kicker: "Quando procurar",
      title: "Quando agendar uma consulta",
      highlight: "consulta",
      intro: "Toque ou passe o cursor sobre um item para ver quando vale buscar avaliação.",
    },
    listLabel: "Motivos para buscar avaliação",
    sheetKicker: "Quando procurar",
    relatedLabel: "Área relacionada",
    disclaimer: "Informação geral, de caráter educativo. Não substitui a avaliação profissional.",
    pendingHint: "Orientação sobre quando procurar atendimento em revisão.",
    items: [
      {
        name: "Sintomas persistentes",
        whenToSeek:
          "Quando um sintoma dura semanas ou volta com frequência, vale investigar a causa com calma.",
        service: "avaliacao",
      },
      {
        name: "Mudanças recentes",
        whenToSeek:
          "Alterações que surgiram ou mudaram de aspecto há pouco tempo merecem avaliação.",
        service: "avaliacao",
      },
      {
        name: "Check-up preventivo",
        whenToSeek: "Consultas periódicas ajudam a acompanhar a saúde mesmo sem sintomas.",
        service: "prevencao",
      },
      {
        name: "Segunda opinião",
        whenToSeek:
          "Se ficou alguma dúvida sobre um diagnóstico ou tratamento, uma nova avaliação ajuda.",
        service: "avaliacao",
      },
      {
        name: "Resultados de exames",
        whenToSeek:
          "Para entender resultados de exames e decidir os próximos passos com segurança.",
        service: "avaliacao",
      },
      {
        name: "Condição crônica",
        whenToSeek:
          "Para acompanhar uma condição de longo prazo e ajustar o cuidado ao longo do tempo.",
        service: "tratamento",
      },
      {
        name: "Antes de um procedimento",
        whenToSeek: "Para avaliar indicação, preparo e cuidados antes de qualquer procedimento.",
        service: "tratamento",
      },
      {
        name: "Histórico familiar",
        whenToSeek: "Quando há casos na família, a avaliação ajuda a definir a prevenção adequada.",
        service: "prevencao",
      },
    ],
  },

  // TEMPLATE: "none" or a variant from src/components/specialty/ (also enable
  // sections.specialtyFeature). Example: "dermatology-skin-journey".
  specialtyFeature: { variant: "none" },

  consultation: {
    heading: {
      kicker: "Consulta",
      title: "Como funciona a consulta",
      highlight: "consulta",
      intro: "Quatro etapas, do primeiro contato ao acompanhamento.",
    },
    steps: [
      {
        title: "Contato",
        description: "Você envia uma mensagem e recebe as opções de data, horário e local.",
      },
      {
        title: "Avaliação completa",
        description:
          "Conversa sem pressa sobre a sua história, exame e análise de exames anteriores.",
      },
      {
        title: "Plano individual",
        description: "As opções são explicadas com clareza e o plano é definido em conjunto.",
      },
      {
        title: "Acompanhamento",
        description: "Retornos programados para avaliar a evolução e ajustar o que for preciso.",
      },
    ],
  },

  differentials: {
    heading: { kicker: "Diferenciais", title: "Como é o atendimento", highlight: "atendimento" },
    items: [
      {
        title: "Escuta sem pressa",
        description: "Tempo de consulta pensado para ouvir, examinar e explicar cada etapa.",
        icon: "listening",
      },
      {
        title: "Conduta baseada em evidência",
        description: "Decisões apoiadas em diretrizes e estudos científicos atualizados.",
        icon: "evidence",
      },
      {
        title: "Avaliação criteriosa",
        description: "Exame detalhado e recursos diagnósticos quando indicados.",
        icon: "precision",
      },
      {
        title: "Fácil acesso",
        description: `Consultório em região central de ${professional.location}.`,
        icon: "locations",
      },
      {
        title: "Atendimento em inglês",
        description: "Consultas também em inglês, para quem preferir.",
        icon: "languages",
      },
      {
        title: "Formação contínua",
        description: "Atualização constante em congressos e cursos da especialidade.",
        icon: "education",
      },
    ],
  },

  faq: {
    heading: { kicker: "Dúvidas", title: "Dúvidas frequentes", highlight: "frequentes" },
    // TEMPLATE: neutral demo answers — confirm every policy with the client.
    items: [
      {
        question: "A consulta é particular ou atende convênio?",
        answer:
          "As formas de atendimento disponíveis, particulares e por convênio, são informadas no agendamento pelo WhatsApp.",
      },
      {
        question: "Como funciona o reembolso?",
        answer:
          "Após a consulta, você recebe a documentação necessária para solicitar o reembolso ao seu plano, conforme as regras do contrato.",
      },
      {
        question: "Quanto tempo dura a consulta?",
        answer:
          "A primeira consulta costuma ser mais longa, para permitir uma avaliação completa. A duração é informada no agendamento.",
      },
      {
        question: "Preciso de algum preparo antes da consulta?",
        answer:
          "Leve exames anteriores, receitas e a lista de medicamentos em uso. Se houver preparo específico, você será avisado no agendamento.",
      },
      {
        question: "Qual é a faixa etária atendida?",
        answer:
          "A faixa etária atendida é informada no agendamento, de acordo com a especialidade.",
      },
      {
        question: "Como funciona o retorno?",
        answer:
          "O retorno é agendado conforme a necessidade de cada caso, para avaliar a evolução e ajustar o plano.",
      },
    ],
  },

  finalCta: {
    kicker: "Agendamento",
    title: "Seu cuidado merece atenção individual.",
    highlight: "atenção individual",
    text: `Agende uma avaliação com ${professional.displayName} em ${professional.location}.`,
    primaryCta: "Agendar pelo WhatsApp",
    secondaryCta: { label: "Conheça a Dra.", href: "#sobre" },
  },

  footer: {
    navTitle: "Navegação",
    infoTitle: "Redes e informações",
    privacyLabel: "Política de Privacidade",
    credit: "Desenvolvido por Samuel Faria",
  },
};
