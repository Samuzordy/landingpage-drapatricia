# CLAUDE.md — Health Landing Starter

Template para **previews comerciais** de landing pages one-page de profissionais da saúde (médicos, dentistas, psicólogos, nutricionistas, fisioterapeutas, clínicas). Objetivo: gerar rapidamente um link visual para apresentar a um potencial cliente. **Não é um produto de produção.**

Como usar o template: veja o `README.md`.

## Fonte de verdade

- `src/content/site.ts` — todo o conteúdo, a identidade do profissional e as seções ativas.
- `src/styles/tokens.css` — tema (tokens marcados com `TEMPLATE:`).
- Se algo não estiver definido, **pergunte antes de inventar**.

## Convenções de trabalho

- Textos da interface em **português do Brasil**. Código, nomes de variáveis e commits em inglês.
- Nenhum texto de interface fixo nos componentes: tudo vem de `site.ts` (ou do `content.ts` de uma variante em `components/specialty/`).
- Ao final de cada tarefa, liste: arquivos criados/alterados, como testar e o que ficou pendente.
- Rode `npm run lint`, `npm run typecheck`, `npm run format:check` e `npm run build` antes de dar uma tarefa como concluída.

## Fora do escopo (preview)

Não implementar: CMS/Sanity, Resend, banco, analytics/GTM/Meta Pixel, autenticação, backend, formulário funcional, agendamento real, SEO avançado/JSON-LD, domínio. CTAs ficam em modo `pending` até existir um WhatsApp real.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 com tokens em `src/styles/tokens.css` (`@theme static`)
- next/image, next/font (Fraunces + Manrope, self-hosted)
- Interações em CSS + pequenos Client Components; ilhas carregadas sob demanda (`LazyIsland`)
- `framer-motion`, `gsap`, `lenis` e `zod` estão instalados mas **não são usados** hoje

## Estrutura

```
src/
  app/              layout.tsx, page.tsx (monta as seções ativas), playground/ (galeria interna)
  content/site.ts   conteúdo + configuração (único arquivo a editar por projeto)
  types/content.ts  modelo de conteúdo
  lib/              sections.ts (âncoras, seções ativas, nav, faixas de profundidade),
                    whatsapp.ts (links wa.me + UTM), image.ts (crop não destrutivo)
  components/
    sections/       Header, Hero, Credentials, About, Services, WhenToSeek, HowItWorks,
                    Differentials, Faq, FinalCta, Footer (+ ilhas interativas)
    specialty/      SpecialtyFeature.tsx (seletor) + variantes opcionais por especialidade
      dermatology/  Jornada da Pele (corte anatômico interativo) — exemplo de variante
    ui/             Button, MagneticButton, Card, Chip, Accordion, Tabs, Tooltip, Marquee,
                    Timeline, WhatsAppFab, BottomSheet, CroppedImage, SectionHeading…
    motion/         LazyIsland, MagnifierLens
  styles/           tokens.css, globals.css, components.css
public/images/      placeholders/ (retratos neutros) e specialty/ (assets de variantes)
```

## Conceito visual

A página "aprofunda" do fundo claro (Hero) até a base escura (CTA final e rodapé). As seções intermediárias recebem faixas de um gradiente contínuo calculado a partir das seções ativas (`bandProps` em `lib/sections.ts`), então desligar uma seção não cria emendas. Elementos-assinatura: células orgânicas com respiração lenta, anéis concêntricos, borda orgânica no CTA final, textura granulada a 3%.

## Regras de interação (obrigatórias)

1. Hover só dentro de `@media (hover: hover) and (pointer: fine)`. Todo hover precisa de um equivalente por toque e por foco de teclado (`:focus-visible`).
2. Com `prefers-reduced-motion: reduce`, desligue parallax, lente automática, marquee e botões magnéticos. Mantenha apenas transições de cor e opacidade.
3. Anime somente `transform` e `opacity` (exceções documentadas: altura do Accordion e colunas dos cards de atuação).
4. Componentes interativos abaixo da dobra são ilhas (`LazyIsland`) com markup estático idêntico renderizado no servidor. Seções estáticas permanecem Server Components.

## Conformidade

- Regras de publicidade do conselho profissional (para médicos, CFM 2.336/2023): sem superlativos, promessas, preços, descontos ou antes e depois.
- Registro profissional (CRM/RQE, CRO, CRP…) sempre visível no Sobre e no rodapé.
- **Nunca invente** depoimentos, números de pacientes, nota do Google, anos de experiência ou telefones. Use `PLACEHOLDER` e `// TODO(cliente)`.
- Não use nomes reais de terceiros (instituições, clínicas) no conteúdo de demonstração.

## Metas de qualidade

- LCP < 2.5s, CLS < 0.1. JS inicial < 120kB gz.
- WCAG 2.2 AA: contraste ≥ 4.5:1, alvos de toque ≥ 44px, skip link, `aria-expanded` em accordions, alt text descritivo.
- Breakpoints de teste: 360, 768, 1024 e 1440px.

## Comandos

```bash
npm run dev           # desenvolvimento
npm run build         # build de produção
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run format:check  # Prettier
```
