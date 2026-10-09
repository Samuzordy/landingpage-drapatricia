/**
 * PROVISIONAL content — replaced by Sanity in Etapa 7 (kept as fallback).
 *
 * Every data point came from CLAUDE.md / docs/especificacao.pdf (public sources) and must be
 * validated with Dra. Valéria before publishing:
 *   - `// VALIDAR`        → data exists but needs confirmation.
 *   - `// TODO(cliente)`  → data missing; waiting for the client.
 *
 * Never invent testimonials, patient counts, Google rating, years of experience or phones.
 * Copy must follow CFM 2.336/2023: no superlatives, promises, prices or promotions.
 */
import type { SiteContent } from "@/types/content";

export const PLACEHOLDER = "PLACEHOLDER" as const;

/** Visible marker for copy the client still has to write or approve. */
export const PENDING_TEXT = "[Texto pendente — aguardando validação da Dra. Valéria]";

/** True while a text field still holds the pending placeholder. */
export const isPending = (text: string | undefined | null): boolean =>
  !text || text === PENDING_TEXT;

export const site: SiteContent = {
  // TODO(cliente): set showPendingMarkers to false once every VALIDAR item is confirmed.
  flags: { showPendingMarkers: true },

  settings: {
    whatsapp: PLACEHOLDER, // TODO(cliente): número de WhatsApp comercial
    mensagemPadrao: "Olá, vim pelo site e gostaria de agendar uma consulta.", // TODO(cliente): mensagem padrão
    instagram: {
      handle: "@valeriafranzon.dermato", // VALIDAR (citado no PDF)
      url: PLACEHOLDER, // TODO(cliente): link do perfil
    },
    email: PLACEHOLDER, // TODO(cliente): e-mail de contato
    seo: {
      title: "Dermatologista em Curitiba | Dra. Valéria Franzon",
      description:
        "Dermatologia clínica, cirúrgica e estética em Curitiba – PR com a Dra. Valéria Franzon. CRM-PR 20510 · RQE 17213.", // VALIDAR
    },
    googleRating: null, // TODO(cliente): nota, total e link do Google Business Profile (com autorização)
  },

  nav: [
    { label: "Sobre", href: "#sobre" },
    { label: "Tratamentos", href: "#tratamentos" },
    { label: "Consulta", href: "#consulta" },
    { label: "Locais", href: "#locais" },
    { label: "Dúvidas", href: "#duvidas" },
  ],

  hero: {
    kicker: "Dermatologista · Curitiba – PR",
    titulo: "Cuidado com a sua pele, guiado pela ciência",
    destaqueItalico: "sua pele",
    // VALIDAR: provisional subtitle assembled from the spec cover line and the three pillar
    // key messages (section 03). TODO(cliente): final copy.
    subtitulo:
      "Dermatologia clínica, cirúrgica e estética: diagnóstico preciso, olhar atento que protege e naturalidade guiada pela ciência.",
    ctaPrimario: "Agendar pelo WhatsApp", // VALIDAR
    ctaSecundario: { label: "Conheça a Dra.", href: "#sobre" },
    ctaHeader: "Agendar",
  },

  credentials: [
    { label: "CRM-PR 20510" },
    { label: "RQE 17213" },
    { label: "Título de especialista SBD", pendente: true }, // VALIDAR
    { label: "Medicina UFPR", pendente: true }, // VALIDAR
    { label: "Professora PUCPR", pendente: true }, // VALIDAR: confirmar se continua lecionando
    { label: "English spoken" },
  ],

  specialist: {
    nome: "Valéria Zanela Franzon",
    nomeExibicao: "Dra. Valéria Franzon", // VALIDAR: nome de exibição
    especialidade: "Dermatologista",
    crm: "CRM-PR 20510",
    rqe: "RQE 17213",
    idiomas: ["Português", "Inglês"],
    foto: undefined, // TODO(cliente): retrato profissional (public/images/retrato-hero.png)
    fotoDetalhe: undefined, // TODO(cliente): textura de pele em alta (public/images/textura-pele-detalhe.jpg)
    // VALIDAR: first-person rewrite using ONLY facts from the spec (section 03) — no invented
    // phrases. TODO(cliente): replace with the bio written/approved by Dra. Valéria.
    bio: [
      "Sou dermatologista em Curitiba e atuo nas áreas clínica, cirúrgica e estética da dermatologia.",
      "Sou formada em Medicina pela Universidade Federal do Paraná (2003) e tenho título de especialista em Dermatologia pela Sociedade Brasileira de Dermatologia (2013). Desde 2010, sou professora do curso de Medicina da PUCPR.",
      "Atendo em português e em inglês.",
    ],
    timeline: [
      // VALIDAR: todos os marcos; TODO(cliente): residência e cursos complementares
      {
        ano: "2003",
        titulo: "Graduação em Medicina — UFPR",
        descricao: PENDING_TEXT, // TODO(cliente)
      },
      {
        ano: "2010",
        titulo: "Professora do curso de Medicina — PUCPR",
        descricao: PENDING_TEXT, // TODO(cliente)
      },
      {
        ano: "2013",
        titulo: "Título de especialista em Dermatologia — SBD",
        descricao: PENDING_TEXT, // TODO(cliente)
      },
      {
        ano: "hoje",
        titulo: "Dermatologia clínica, cirúrgica e estética em Curitiba", // VALIDAR (capa do PDF) · TODO(cliente): título final
        descricao: PENDING_TEXT, // TODO(cliente)
      },
    ],
    instituicoes: [
      // TODO(cliente): logos com autorização de uso
      { nome: "Universidade Federal do Paraná", sigla: "UFPR" },
      { nome: "Pontifícia Universidade Católica do Paraná", sigla: "PUCPR" },
      { nome: "Sociedade Brasileira de Dermatologia", sigla: "SBD" },
    ],
    citacao: PENDING_TEXT, // TODO(cliente): citação-assinatura
  },

  pillars: [
    // VALIDAR: lista final de procedimentos oferecidos
    {
      titulo: "Dermatologia Clínica",
      slug: "clinica",
      resumo: PENDING_TEXT, // TODO(cliente)
      mensagemChave: "Diagnóstico preciso para o que incomoda hoje.",
      servicos: [
        "Acne",
        "Rosácea",
        "Eczema",
        "Dermatite seborreica",
        "Alergias (patch test)",
        "Queda de cabelo e alopecias",
        "Caspa",
        "Doenças das unhas",
        "Psoríase",
      ],
      ordem: 1,
    },
    {
      titulo: "Dermatologia Cirúrgica e Prevenção",
      slug: "cirurgica-prevencao",
      resumo: PENDING_TEXT, // TODO(cliente)
      mensagemChave: "Olhar atento que protege.",
      servicos: [
        "Dermatoscopia digital (mapeamento de pintas)",
        "Biópsias",
        "Remoção de sinais, cistos e verrugas",
        "Crioterapia",
        "Eletrocoagulação",
        "Excisão e sutura",
        "Rastreio de câncer de pele",
      ],
      ordem: 2,
    },
    {
      titulo: "Dermatologia Estética",
      slug: "estetica",
      resumo: PENDING_TEXT, // TODO(cliente)
      mensagemChave: "Naturalidade guiada pela ciência.",
      servicos: [
        "Toxina botulínica",
        "Preenchimento",
        "Peelings",
        "Rejuvenescimento facial",
        "Cicatrizes",
      ],
      ordem: 3,
    },
  ],

  skinLayers: [
    // TODO(cliente): conteúdo educativo e relação camada → tratamentos exigem revisão médica
    {
      id: "epiderme",
      nome: "Epiderme",
      profundidade: 1,
      descricao: PENDING_TEXT,
      tratamentos: [],
    },
    {
      id: "derme",
      nome: "Derme",
      profundidade: 2,
      descricao: PENDING_TEXT,
      tratamentos: [],
    },
    {
      id: "hipoderme",
      nome: "Hipoderme",
      profundidade: 3,
      descricao: PENDING_TEXT,
      tratamentos: [],
    },
  ],

  conditions: [
    // TODO(cliente): textos de "quando procurar" (até 140 caracteres) com revisão médica
    { nome: "Acne", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: true },
    { nome: "Rosácea", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: false },
    { nome: "Eczema", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: false },
    {
      nome: "Dermatite seborreica",
      quandoProcurar: PENDING_TEXT,
      pilar: "clinica",
      destaque: false,
    },
    { nome: "Alergias de pele", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: false },
    { nome: "Melasma", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: true }, // VALIDAR: pilar
    { nome: "Queda de cabelo", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: true },
    { nome: "Doenças das unhas", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: false },
    { nome: "Psoríase", quandoProcurar: PENDING_TEXT, pilar: "clinica", destaque: false },
    {
      nome: "Pintas e sinais",
      quandoProcurar: PENDING_TEXT,
      pilar: "cirurgica-prevencao",
      destaque: true,
    },
    {
      nome: "Cistos e verrugas",
      quandoProcurar: PENDING_TEXT,
      pilar: "cirurgica-prevencao",
      destaque: false,
    },
    { nome: "Cicatrizes", quandoProcurar: PENDING_TEXT, pilar: "estetica", destaque: false },
  ],

  consultationSteps: [
    { ordem: 1, titulo: "Contato", descricao: PENDING_TEXT }, // TODO(cliente)
    { ordem: 2, titulo: "Avaliação completa", descricao: PENDING_TEXT }, // TODO(cliente)
    { ordem: 3, titulo: "Plano individual", descricao: PENDING_TEXT }, // TODO(cliente)
    { ordem: 4, titulo: "Acompanhamento", descricao: PENDING_TEXT }, // TODO(cliente)
  ],

  differentials: [
    // TODO(cliente): descrições
    { titulo: "Escuta sem pressa", descricao: PENDING_TEXT },
    { titulo: "Conduta baseada em evidência", descricao: PENDING_TEXT },
    { titulo: "Dermatoscopia digital", descricao: PENDING_TEXT },
    { titulo: "3 endereços em Curitiba", descricao: PENDING_TEXT }, // VALIDAR: locais ativos
    { titulo: "Atendimento em inglês", descricao: PENDING_TEXT },
    { titulo: "Formação acadêmica", descricao: PENDING_TEXT },
  ],

  // TODO(cliente): somente avaliações públicas com autorização explícita (autorizado: true)
  testimonials: [],

  faqs: [
    // TODO(cliente): todas as respostas
    { ordem: 1, pergunta: "A consulta é particular ou atende convênio?", resposta: PENDING_TEXT },
    { ordem: 2, pergunta: "Como funciona o reembolso?", resposta: PENDING_TEXT },
    { ordem: 3, pergunta: "Quanto tempo dura a consulta?", resposta: PENDING_TEXT },
    { ordem: 4, pergunta: "Preciso de algum preparo antes da consulta?", resposta: PENDING_TEXT },
    { ordem: 5, pergunta: "Qual é a idade mínima para atendimento?", resposta: PENDING_TEXT },
    { ordem: 6, pergunta: "Como funciona o retorno?", resposta: PENDING_TEXT },
  ],

  locations: [
    // VALIDAR: quais endereços seguem ativos
    {
      _id: "juveve",
      bairro: "Juvevê",
      clinica: "Clínica Pierre Fauchard",
      endereco: "Av. Munhoz da Rocha, 668",
      cep: PLACEHOLDER, // TODO(cliente)
      geo: null, // TODO(cliente): coordenadas confirmadas
      horarios: [], // TODO(cliente)
      convenios: ["Particular", "Saúde Caixa"], // VALIDAR: lista e reembolso
      mapsUrl: PLACEHOLDER, // TODO(cliente)
      ativo: true, // VALIDAR
    },
    {
      _id: "batel",
      bairro: "Batel",
      endereco: "Av. do Batel, 1889",
      cep: PLACEHOLDER, // TODO(cliente)
      geo: null, // TODO(cliente)
      horarios: [], // TODO(cliente)
      convenios: ["Particular", "Saúde Caixa"], // VALIDAR
      mapsUrl: PLACEHOLDER, // TODO(cliente)
      ativo: true, // VALIDAR
    },
    {
      _id: "agua-verde",
      bairro: "Água Verde",
      endereco: "Av. Pres. Getúlio Vargas, 2499",
      cep: PLACEHOLDER, // TODO(cliente)
      geo: null, // TODO(cliente)
      horarios: [], // TODO(cliente)
      convenios: ["Particular", "Saúde Caixa"], // VALIDAR
      mapsUrl: PLACEHOLDER, // TODO(cliente)
      ativo: true, // VALIDAR
    },
  ],
};
