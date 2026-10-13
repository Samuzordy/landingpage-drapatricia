# Health Landing Starter

Template para montar rapidamente **previews comerciais** de landing pages para profissionais da saúde. Não é produção: sem CMS, formulário, analytics ou backend. O objetivo é chegar a um link visual para apresentar ao cliente.

O conteúdo padrão é fictício ("Dra. Nome Sobrenome", "CRM-UF 00000", "Cidade – UF").

## Nova landing em 10 passos

1. **Duplicar** a pasta, sem `node_modules`, `.next` e `.git`. Depois rode `git init` e `npm install`.
2. **Renomear** o projeto: `name` no `package.json`.
3. **Editar `src/content/site.ts`**: identidade (`professional`), hero, sobre, áreas de atuação, quando procurar, consulta, diferenciais, FAQ, CTA final e rodapé. Comece pelo objeto `professional` no topo, que alimenta header, hero, SEO e rodapé.
4. **Substituir as imagens** em `public/images/` (retratos 4:5) e apontar `images.hero` / `images.about` em `site.ts`.
   - Foto com texto ou logo nas bordas: use `crop: { x, y, width }`, um recorte visual que não altera o arquivo.
   - Para ajustar o enquadramento do rosto: `objectPosition: "50% 30%"`.
   - O hero é pré-carregado (LCP); as outras imagens são lazy.
5. **Ajustar as cores** em `src/styles/tokens.css`: só os tokens marcados com `TEMPLATE:`. Atualize também `settings.themeColor` em `site.ts` e confira o contraste dos tokens de texto (≥ 4.5:1).
6. **Escolher as seções** em `site.sections` (`true`/`false`). Os links do menu e do rodapé, os CTAs que apontam para seções desligadas e o gradiente de fundo se ajustam sozinhos.
7. **SpecialtyFeature**: deixe `specialtyFeature.variant: "none"` ou use uma variante (veja abaixo).
8. **Revisar** em 360, 768, 1024 e 1440px, só com teclado e com "reduzir movimento" ativado. Use `/playground` para conferir os componentes isolados.
9. **Checks**: `npm run lint && npm run typecheck && npm run format:check && npm run build`.
10. **Deploy do preview** na Vercel (importar o repositório, sem variáveis de ambiente). Compartilhe a URL de preview.

## O que normalmente precisa ser personalizado

- `src/content/site.ts`: nome, título, especialidade, registros (CRM/RQE, CRO, CRP, CRN…), cidade, textos de todas as seções, redes sociais e seções ativas.
- `public/images/`: retratos do hero e do sobre.
- `src/styles/tokens.css`: tokens de cor `TEMPLATE:` (cor principal, superfícies, texto, faixas de profundidade).
- WhatsApp: deixe `PLACEHOLDER` até ter o número real. Os CTAs aparecem como "disponível em breve" e nenhum número fictício é linkado.
- Opcional: lente de aumento no retrato do hero (`hero.lens`) e a SpecialtyFeature.

## O que normalmente não precisa ser alterado

- Componentes em `src/components/ui/` e `src/components/motion/`.
- Lógica das seções em `src/components/sections/`, que só leem `site.ts`.
- `src/lib/` (seções/nav/faixas, WhatsApp + UTM, crop de imagem).
- `globals.css` e `components.css`: regras de hover, foco, reduced motion e faixas de profundidade.
- `/playground`, rota interna com `noindex`.

## SpecialtyFeature (seção temática opcional)

É uma seção entre "Atuação" e "Quando procurar", reservada a uma interação própria da especialidade. Existe uma variante de exemplo:

- **`dermatology-skin-journey`**: Jornada da Pele (corte anatômico interativo com abas). Fica em `src/components/specialty/dermatology/`, com conteúdo (`content.ts`), CSS e ilhas próprios.

Para ativar:

```ts
sections: { ..., specialtyFeature: true },
specialtyFeature: { variant: "dermatology-skin-journey" },
```

Para usar a lente dermatoscópica no hero desse mesmo projeto:

```ts
import { skinDetailImage } from "@/components/specialty/dermatology/content";
// …
hero: { ..., lens: { detail: skinDetailImage, label: "aumento 10x" } },
```

Para criar uma variante nova (coração, etapas odontológicas, mapa corporal…):

1. Crie `src/components/specialty/<especialidade>/` com a seção, o `content.ts` e o CSS.
2. Na raiz da seção use `id="destaque"` e `{...bandProps("specialtyFeature")}` com a classe `depth-band`.
3. Adicione o id em `SpecialtyVariant` (`src/types/content.ts`) e um `case` em `src/components/specialty/SpecialtyFeature.tsx`.

Projeto sem variante: apague a pasta da especialidade e o `case` correspondente.

## Boas práticas de conteúdo

- Nada de superlativos, promessas, preços ou antes e depois (regras do conselho profissional; para médicos, CFM 2.336/2023).
- Nunca invente depoimentos, nota do Google, número de pacientes ou telefones.
- `flags.showPendingMarkers: true` mostra selos "a validar" nos dados marcados como pendentes, o que ajuda na revisão com o cliente.
