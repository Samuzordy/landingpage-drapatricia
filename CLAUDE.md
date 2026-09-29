# CLAUDE.md — Landing Page Dra. Valéria Franzon

Landing page one-page para dermatologista em Curitiba – PR. Objetivo: converter visitas vindas do Instagram em agendamentos via WhatsApp, transmitindo autoridade médica e sensibilidade estética.

## Fonte de verdade

- `docs/especificacao.pdf` — especificação completa (conceito, design system, seções, interações, arquitetura, CMS, SEO, conformidade).
- `docs/ROTEIRO_PROMPTS.md` — ordem de execução por etapas.
- Em caso de conflito, este arquivo e o PDF vencem qualquer suposição. Se algo não estiver definido, **pergunte antes de inventar**.

## Convenções de trabalho

- Textos da interface em **português do Brasil**. Código, nomes de variáveis e commits em inglês.
- Ao alterar código, entregue **arquivos completos** com o caminho exato, prontos para substituir. Evite patches fragmentados.
- Ao final de cada etapa, liste: arquivos criados/alterados, como testar e o que ficou pendente.
- Trabalhe **uma etapa por vez** conforme o roteiro. Não adiante etapas sem pedido.
- Rode `npm run lint` e `npm run build` antes de dar uma etapa como concluída.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 com design tokens em CSS variables (`src/styles/tokens.css`)
- Framer Motion (estados e hover) + GSAP ScrollTrigger (narrativa de scroll) + Lenis (smooth scroll)
- Sanity (Studio em `/studio`) — **somente a partir da Etapa 7**; antes disso, conteúdo em `src/content/site.ts`
- next/image, next/font (self-hosted), Zod, Resend, Vercel
- Testes: Vitest + Testing Library; Playwright para o fluxo de CTA

## Estrutura de pastas

```
src/
  app/            layout.tsx, page.tsx, politica-de-privacidade/, studio/, actions/lead.ts,
                  sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    sections/     Header, Hero, Credentials, About, Pillars, SkinJourney, Conditions,
                  HowItWorks, Differentials, Testimonials, InstagramFeed, Faq,
                  Locations, FinalCta, Footer
    ui/           Button, MagneticButton, Card, Chip, Accordion, Tabs, Tooltip,
                  Marquee, Timeline, WhatsAppFab
    motion/       DermatoscopeLens, DepthBackground, Reveal, SplitText
    seo/          JsonLd
  content/        site.ts (conteúdo provisório tipado)
  lib/            whatsapp.ts, analytics.ts, sanity/ (client, queries, image)
  styles/         tokens.css, globals.css
  types/          content.ts
sanity/schemas/   specialist, pillar, skinLayer, condition, testimonial, faq, location, siteSettings
public/images/    placeholders até receber as fotos reais
```

## Conceito criativo: "Camadas da Pele"

A página é uma descida da superfície da pele até a base. O fundo muda de cor continuamente com o scroll:

| Faixa | Seções | Fundo |
|---|---|---|
| Epiderme (superfície) | Header, Hero, Credenciais | `#F7F1EC` |
| Derme (estrutura) | Sobre, Pilares, Jornada da Pele, Quando procurar | `#EAD5CA` |
| Derme profunda (vínculo) | Como funciona, Diferenciais, Depoimentos, Conteúdo | `#D2A796` |
| Hipoderme (base) | FAQ, Locais, CTA final, Rodapé | `#A8634F` (texto claro) |

Elementos-assinatura: Lente Dermatoscópica no hero, gradiente de profundidade, corte anatômico interativo, "células" orgânicas com respiração lenta, textura granulada a 3% de opacidade.

## Design tokens

```css
--color-porcelana: #F7F1EC;   /* fundo principal */
--color-areia:     #E9DCD1;   /* fundos secundários, divisores */
--color-rose:      #C98F7E;   /* acentos, bordas ativas, ícones — nunca texto corrido */
--color-terracota: #A8634F;   /* CTAs, links, destaques */
--color-cacau:     #3B2A25;   /* textos e títulos */
--color-salvia:    #8FA392;   /* selos clínicos, sucesso */

--ease-skin: cubic-bezier(.22, 1, .36, 1);
--dur-fast: 180ms;   /* cor, sublinhado, ícones */
--dur-base: 320ms;   /* elevação de cards, expansões */
--dur-slow: 700ms;   /* revelações no scroll */
/* stagger de listas: 60ms */

--radius-card: 20px;
--radius-pill: 999px;
--shadow-warm: 0 20px 50px -20px rgba(59, 42, 37, .18);
```

Tipografia (via next/font):
- **Fraunces** para display e títulos: H1 `clamp(2.4rem, 6vw, 4.8rem)`, H2 `clamp(1.8rem, 4vw, 3rem)`, peso 300–400, itálico em palavras-chave.
- **Manrope** para corpo: 1rem a 1.0625rem, line-height 1.65, máximo de 68 caracteres por linha.
- Kicker: Manrope Medium, 0.75rem, caixa alta, tracking +18%, cor terracota.

Grid: 12 colunas, container 1200px, gutter 24px. No mobile, 4 colunas e margem de 20px. Espaçamento base 8. Seções com 96–128px de respiro vertical no desktop e 64px no mobile.

## Regras de interação (obrigatórias)

1. Hover só dentro de `@media (hover: hover) and (pointer: fine)`. Todo hover precisa de um equivalente por toque e por foco de teclado (`:focus-visible`).
2. Com `prefers-reduced-motion: reduce`, desligue parallax, lente automática, marquee e botões magnéticos. Mantenha apenas transições de cor e opacidade.
3. Anime somente `transform` e `opacity`. Nunca anime width, height, top ou left.
4. Componentes interativos são Client Components carregados com `dynamic()` ao entrar na viewport. Seções estáticas permanecem Server Components.

Resumo dos componentes (detalhes na seção 07 do PDF):

- **Cards de texto:** sobem 6px com sombra quente. A borda passa de areia para rosé. Um brilho radial segue o cursor (`--mx`/`--my`).
- **Pilares:** o card em hover cresce de 1fr para 1.6fr e a lista de serviços entra com stagger. No mobile, vira accordion.
- **Jornada da Pele:** a camada sob o cursor ganha destaque e as outras ficam a 40%. O painel lateral troca de conteúdo. No mobile, a seleção é por abas.
- **Chips de condições:** o fundo muda de porcelana para terracota e aparece um tooltip de "quando procurar". No mobile, abre um bottom-sheet.
- **Lente Dermatoscópica:** círculo de 160px com `clip-path: circle()` e inércia (lerp 0.12). No mobile, faz um trajeto automático de 6s.
- **CTA:** efeito magnético de até 6px e preenchimento circular a partir do ponto de entrada do cursor.
- **Menu:** sublinhado animado e scroll-spy. O header vira vidro fosco após 80px, esconde ao descer e reaparece ao subir.

## Seções e âncoras

`#inicio` Hero · Credenciais (marquee) · `#sobre` · `#tratamentos` · `#jornada` · `#condicoes` · `#consulta` · `#diferenciais` · `#depoimentos` · `#conteudo` · `#duvidas` · `#locais` · CTA final · Rodapé.

Há também um botão flutuante de WhatsApp fixo, com mensagem pré-preenchida e UTM.

## Conteúdo base (PROVISÓRIO — todos os itens marcados com VALIDAR)

- Nome: Dra. Valéria Zanela Franzon — Dermatologista (VALIDAR nome de exibição)
- CRM-PR 20510 · RQE 17213 (obrigatório no rodapé e na seção Sobre)
- Medicina UFPR (2003) · Professora de Medicina PUCPR (2010) · Título de especialista SBD (2013) — VALIDAR
- Atende em português e inglês
- Locais (VALIDAR quais estão ativos):
  - Juvevê — Clínica Pierre Fauchard, Av. Munhoz da Rocha 668
  - Batel — Av. do Batel 1889
  - Água Verde — Av. Pres. Getúlio Vargas 2499
- Pilares:
  - **Clínica:** acne, rosácea, eczema, dermatite seborreica, alergias/patch test, queda de cabelo, unhas, psoríase
  - **Cirúrgica e Prevenção:** dermatoscopia digital, biópsias, remoção de sinais/cistos/verrugas, crioterapia, eletrocoagulação, excisão
  - **Estética:** toxina botulínica, preenchimento, peelings, rejuvenescimento, cicatrizes
- WhatsApp, Instagram e e-mail: usar `PLACEHOLDER` até a cliente enviar

**Nunca invente** depoimentos, números de pacientes, nota do Google, anos de experiência ou telefones. Use placeholders claramente marcados com `// TODO(cliente)`.

## Conformidade (CFM 2.336/2023 e LGPD)

- Não use superlativos nem promessas ("a melhor", "garantido", "resultado perfeito").
- Não exiba preços, descontos ou promoções de procedimentos.
- Não use imagens de antes e depois sem aprovação explícita.
- Depoimentos só aparecem com `autorizado: true`.
- GA4 e Meta Pixel carregam **somente após o consentimento** no banner (Aceitar / Recusar / Personalizar).
- O formulário coleta o mínimo: nome, WhatsApp e motivo opcional. Inclua checkbox de ciência com link para a Política de Privacidade. Nenhum dado pessoal em parâmetros de URL.

## Metas de qualidade

- LCP < 2.5s, INP < 200ms, CLS < 0.1. JS inicial < 120kB gz. Lighthouse ≥ 90 em todas as categorias.
- WCAG 2.2 AA: contraste ≥ 4.5:1, alvos de toque ≥ 44px, skip link, `aria-expanded` em accordions e abas, alt text descritivo.
- Breakpoints de teste: 360, 768, 1024 e 1440px.

## Comandos

```bash
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run lint       # ESLint
npm run test       # Vitest
npm run e2e        # Playwright
```
