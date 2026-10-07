# Roteiro de prompts — Claude Code

Execute uma etapa por vez. Ao terminar cada uma, rode `npm run dev`, confira no navegador (desktop e mobile, pelo DevTools) e só depois avance. Se algo ficar estranho, peça ajustes pontuais antes de seguir.

## Preparação (manual, antes da Etapa 1)

1. Crie a pasta do projeto e, dentro dela, a pasta `docs/`.
2. Coloque `CLAUDE.md` na raiz, e `especificacao.pdf` e `ROTEIRO_PROMPTS.md` em `docs/`.
3. Se já tiver as imagens, coloque em `public/images/`:
   - `retrato-hero.png` — fundo removido
   - `textura-pele-detalhe.jpg` — para a lente, mínimo 2000px
   - fotos do consultório
4. Rode `git init` e faça o primeiro commit só com os docs.

---

## Etapa 1 — Setup e design tokens

```
Leia o CLAUDE.md e o docs/especificacao.pdf inteiros antes de começar.

Etapa 1: crie o projeto Next.js 15 com App Router, TypeScript strict, Tailwind v4, ESLint e Prettier na pasta atual.
- Configure Fraunces e Manrope via next/font.
- Crie src/styles/tokens.css com todos os tokens do CLAUDE.md e ligue-os ao tema do Tailwind.
- Crie globals.css com reset, textura granulada (3% de opacidade, via SVG noise inline) e as regras de prefers-reduced-motion.
- Monte a estrutura de pastas do CLAUDE.md com arquivos vazios ou exportando componentes placeholder.
- Crie src/types/content.ts e src/content/site.ts com o conteúdo provisório do CLAUDE.md, tipado, com TODO(cliente) onde faltar dado.
- Instale framer-motion, gsap, lenis e zod.
Ao final, liste os arquivos e confirme que npm run build passa.
```

**Confira:** a página abre sem erro, as fontes carregam e as cores aparecem no Tailwind (`bg-porcelana`, `text-cacau`).

---

## Etapa 2 — Componentes base de UI

```
Etapa 2: crie os componentes em src/components/ui seguindo as regras de interação do CLAUDE.md e a seção 07 do PDF:
Button (primário terracota / secundário outline), MagneticButton, Card (com elevação, borda rosé e brilho radial seguindo --mx/--my), Chip (com Tooltip), Accordion (grid-template-rows 0fr→1fr), Tabs, Tooltip, Marquee (pausa no hover), Timeline, WhatsAppFab.
Hover só dentro de (hover: hover) and (pointer: fine), com equivalentes por foco e toque. Anime só transform e opacity.
Crie uma rota temporária /playground mostrando todos os componentes e seus estados, para eu revisar.
```

**Confira:** navegue pelo `/playground` só com Tab (o foco precisa estar visível), teste no modo mobile e ative "reduzir movimento" no sistema.

---

## Etapa 3 — Header, Hero e Lente Dermatoscópica

```
Etapa 3: implemente Header, Hero, Credentials e o componente motion/DermatoscopeLens.
- Header: menu por âncoras, botão Agendar, vira vidro fosco após 80px, esconde ao descer e reaparece ao subir, scroll-spy, menu fullscreen no mobile com stagger.
- Hero: H1 "Cuidado com a sua pele, guiado pela ciência" com itálico em "sua pele", subtítulo, CTA WhatsApp (MagneticButton) e CTA secundário para #sobre, retrato à direita e células orgânicas com respiração (scale 1→1.03 em 6s).
- DermatoscopeLens: círculo de 160px com clip-path: circle(80px at var(--lx) var(--ly)) revelando a imagem de detalhe, inércia lerp 0.12, anel fino terracota e rótulo "aumento 10x". No mobile, trajeto automático de 6s e depois recolhe. Com reduced-motion, fica desligada.
- Credentials: marquee com CRM-PR 20510 · RQE 17213 · SBD · UFPR · Professora PUCPR · English spoken.
- lib/whatsapp.ts: gera o link wa.me com mensagem padrão e UTM.
Use placeholders em public/images se as fotos reais não existirem.
```

**Confira:** a lente precisa ficar fluida (60fps) e o LCP do retrato deve estar com `priority`.

---

## Etapa 4 — Seções de conteúdo estático

```
Etapa 4: implemente About (com Timeline e logos institucionais placeholder), Pillars, Conditions, HowItWorks, Differentials e Footer, consumindo src/content/site.ts.
- Pillars: 3 cards; o card em hover cresce de 1fr para 1.6fr e os outros encolhem; a lista de serviços entra com stagger de 60ms; zoom de 1.05 na imagem. No mobile, vira accordion.
- Conditions: grade de Chips com tooltip de "quando procurar". No mobile, abre um bottom-sheet.
- HowItWorks: 4 passos com uma linha que se desenha conforme o scroll.
- Footer: nome, CRM, RQE, redes, link da política de privacidade.
Siga as regras de conformidade do CLAUDE.md nos textos: nada de superlativos ou promessas.
```

---

## Etapa 5 — Jornada da Pele e fundo de profundidade

```
Etapa 5: implemente motion/DepthBackground e a seção SkinJourney.
- DepthBackground: use GSAP ScrollTrigger para interpolar a cor de fundo do body entre as 4 faixas do CLAUDE.md (porcelana → #EAD5CA → #D2A796 → terracota), trocando a cor do texto para clara na faixa final. Mantenha contraste AA em todas as faixas.
- SkinJourney: ilustração SVG em corte com 3 camadas (epiderme, derme, hipoderme), cada uma em um <g> com id. No hover, a camada ativa ganha saturação e sobe 4px, as outras ficam a 40%, e o painel lateral troca o conteúdo com fade + slide de 12px. No mobile, a seleção é por abas abaixo da ilustração. O conteúdo das camadas deve ter caráter educativo e ser marcado como TODO(cliente) para revisão médica.
- Integre Lenis com o ScrollTrigger.
Se existir public/images/corte-pele.svg, use esse arquivo em vez de desenhar o SVG.
```

**Confira:** role devagar a página inteira. A transição de cor precisa ser contínua, sem saltos.

---

## Etapa 6 — Depoimentos, conteúdo, FAQ e locais

```
Etapa 6: implemente Testimonials, InstagramFeed, Faq, Locations e FinalCta.
- Testimonials: carrossel com swipe e snap; o card central fica em destaque; o autoplay pausa no hover. Exiba apenas itens com autorizado: true. Por enquanto, use 3 depoimentos PLACEHOLDER claramente marcados, sem inventar texto realista.
- InstagramFeed: grade de 6 imagens estáticas placeholder + CTA "Siga @valeriafranzon.dermato".
- Faq: Accordion com 6 perguntas (convênio, reembolso, duração da consulta, preparo, idade mínima, retorno). As respostas ficam como TODO(cliente).
- Locations: abas por bairro, mapa embutido com cross-fade, endereço, horários e botão "Como chegar". Não carregue iframe de mapa antes da interação; use uma imagem estática e troque pelo iframe no clique.
- FinalCta: bloco grande sobre fundo terracota.
```

---

## Etapa 7 — Migração para o Sanity

```
Etapa 7: configure o Sanity com o Studio embutido em /studio.
- Crie os schemas da seção 09 do PDF (siteSettings e specialist como singletons, pillar, skinLayer, condition, testimonial, faq, location), com validação: CRM e RQE obrigatórios, quandoProcurar com no máximo 140 caracteres.
- Crie lib/sanity (client, queries GROQ tipadas, helper de imagem) e troque src/content/site.ts pelas queries, mantendo site.ts como fallback caso as variáveis de ambiente não existam.
- Crie uma rota de revalidação via webhook usando revalidateTag.
- Gere um script de seed que popula o Sanity com o conteúdo atual de site.ts.
- Crie .env.example com todas as variáveis necessárias.
Me diga passo a passo o que eu preciso criar no painel do Sanity.
```

**Manual:** crie o projeto no sanity.io, preencha o `.env.local` e rode o seed.

---

## Etapa 8 — Formulário, LGPD e analytics

```
Etapa 8:
- Server Action em app/actions/lead.ts com validação Zod (nome, WhatsApp e motivo opcional), envio de e-mail via Resend e, em seguida, redirecionamento para o WhatsApp.
- Checkbox de ciência obrigatório com link para /politica-de-privacidade.
- Crie a página /politica-de-privacidade com uma estrutura base (controlador, finalidade, dados coletados, direitos do titular, contato), com o texto final marcado como TODO(cliente).
- Banner de consentimento (Aceitar / Recusar / Personalizar). GA4 e Meta Pixel só carregam após o aceite. Registre eventos de clique em todos os CTAs de WhatsApp.
- Nenhum dado pessoal em URL.
```

---

## Etapa 9 — SEO, performance, acessibilidade e testes

```
Etapa 9:
- Metadata completa, sitemap.ts, robots.ts, opengraph-image.tsx e URL canônica.
- Crie components/seo/JsonLd com os schemas Physician, MedicalClinic (um por local ativo, com geo e horários), FAQPage e BreadcrumbList.
- Rode uma auditoria: confirme que todos os componentes interativos usam dynamic(), que as imagens estão em AVIF/WebP com sizes corretos e que as fontes não causam CLS. Informe o tamanho do JS inicial.
- Acessibilidade: skip link, aria-expanded, foco visível, alt text e alvos de toque ≥ 44px. Verifique o contraste em cada faixa de cor.
- Crie testes Vitest para Accordion, Tabs e whatsapp.ts, e um teste Playwright que clica no CTA do hero e valida o link do WhatsApp.
- Remova a rota /playground.
Me entregue um relatório com o que passou e o que precisa de ação minha.
```

**Confira:** rode o Lighthouse no modo anônimo, com perfil mobile. A meta é ≥ 90 em todas as categorias.

---

## Etapa 10 — Deploy

```
Etapa 10: prepare o deploy na Vercel. Liste as variáveis de ambiente, configure os headers de segurança (CSP compatível com GA4, Meta Pixel, Sanity e Google Maps) e escreva um README com instruções de edição no Studio voltadas para a cliente, em linguagem simples.
```

**Manual:** conecte o repositório na Vercel, configure o domínio e o webhook do Sanity apontando para a rota de revalidação.

---

## Prompts úteis de ajuste

- "Compare a seção X com a seção 07 do PDF e liste o que está diferente da especificação."
- "O hover do [componente] está [forte/lento/brusco]. Ajuste mantendo os tokens de duração."
- "Revise todos os textos da página contra as regras de conformidade do CLAUDE.md."
- "Teste a página em 360px e corrija qualquer overflow horizontal."
