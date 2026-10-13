import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { Tabs } from "@/components/ui/Tabs";
import { Timeline } from "@/components/ui/Timeline";
import { Tooltip } from "@/components/ui/Tooltip";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { site } from "@/content/site";
import { ChipToggleDemo, ControlledTabsDemo } from "./PlaygroundDemos";

// Internal development route (noindex) — component gallery for reviewing states.
export const metadata: Metadata = {
  title: "Playground de componentes (interno)",
  robots: { index: false, follow: false },
};

const LONG_TEXT =
  "Texto longo de exemplo para validar quebra de linha, largura máxima de leitura (68 caracteres) e o comportamento do componente quando o conteúdo ocupa várias linhas em telas estreitas.";

// Roles, not hex values: the swatches follow tokens.css whatever the project palette is.
const SWATCHES = [
  { name: "Porcelana", token: "bg-porcelana", role: "fundo claro" },
  { name: "Areia", token: "bg-areia", role: "superfície suave" },
  { name: "Rosé", token: "bg-rose", role: "acento decorativo" },
  { name: "Terracota", token: "bg-terracota", role: "cor principal" },
  { name: "Terracota texto", token: "bg-terracota-texto", role: "principal p/ texto" },
  { name: "Cacau", token: "bg-cacau", role: "texto" },
  { name: "Sálvia", token: "bg-salvia", role: "sucesso / acento" },
  { name: "Faixa média", token: "bg-band-mid", role: "fundo do meio" },
  { name: "Faixa profunda", token: "bg-band-deep", role: "fundo profundo" },
  { name: "Base escura", token: "bg-band-base", role: "CTA final e rodapé" },
];

function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-areia py-12 md:py-16"
    >
      <h2 id={`${id}-title`} className="text-[1.75rem] md:text-[2.25rem]">
        {title}
      </h2>
      {note && <p className="mt-2 measure text-sm text-cacau/80">{note}</p>}
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

function State({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-cacau/70 uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

const NAV = [
  ["fundamentos", "Fundamentos"],
  ["button", "Button"],
  ["magnetic", "MagneticButton"],
  ["card", "Card"],
  ["chip", "Chip"],
  ["tooltip", "Tooltip"],
  ["accordion", "Accordion"],
  ["tabs", "Tabs"],
  ["marquee", "Marquee"],
  ["timeline", "Timeline"],
  ["fab", "WhatsAppFab"],
] as const;

export default function PlaygroundPage() {
  return (
    <>
      <div
        role="note"
        className="bg-cacau px-5 py-3 text-center text-sm font-medium text-porcelana"
      >
        Ambiente interno de desenvolvimento · não indexado · não faz parte do site público
      </div>

      <main className="container-page pb-32">
        <header className="py-12 md:py-16">
          <p className="kicker">Template · componentes base</p>
          <h1 className="mt-2">
            Playground de <em className="font-light">componentes</em>
          </h1>
          <p className="mt-4 measure text-cacau/85">
            Use <kbd className="rounded border border-areia px-1.5 font-sans text-sm">Tab</kbd> para
            conferir o foco visível. Os estados de hover só aparecem com mouse; no toque, os
            equivalentes são pressão, ripple e toque para abrir. Ative “reduzir movimento” no
            sistema para conferir os estados sem deslocamento.
          </p>
          <nav aria-label="Componentes" className="mt-8">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {NAV.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="inline-flex min-h-11 items-center underline decoration-rose underline-offset-4 hover:decoration-terracota"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <Section
          id="fundamentos"
          title="Fundamentos"
          note="Tokens de cor e tipografia de src/styles/tokens.css."
        >
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((s) => (
              <li key={s.name}>
                <span className={`block h-16 rounded-card border border-areia ${s.token}`} />
                <p className="mt-2 text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-cacau/75">{s.role}</p>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <p className="kicker">Kicker · Manrope Medium</p>
            <p className="font-display text-h2 font-light">
              Cuidado com a <em>sua saúde</em>
            </p>
            <p className="measure">{LONG_TEXT}</p>
          </div>
        </Section>

        <Section
          id="button"
          title="Button"
          note="CSS puro (Server Component). Hover: preenchimento circular a partir do centro e seta desliza 4px. Toque: scale .97."
        >
          <State label="Variantes">
            <div className="flex flex-wrap gap-3">
              <Button>Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button arrow>Com seta</Button>
              <Button variant="secondary" arrow>
                Secundário com seta
              </Button>
            </div>
          </State>
          <State label="Tamanhos">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="md">Médio (44px)</Button>
              <Button size="lg">Grande (52px)</Button>
            </div>
          </State>
          <State label="Link (<a>) e link externo">
            <div className="flex flex-wrap gap-3">
              <Button href="#card">Ir para Card</Button>
              <Button href="https://nextjs.org" external variant="secondary" arrow>
                Link externo (nova aba)
              </Button>
            </div>
          </State>
          <State label="Disabled">
            <div className="flex flex-wrap gap-3">
              <Button disabled>Primário desabilitado</Button>
              <Button variant="secondary" disabled>
                Secundário desabilitado
              </Button>
              <Button href="#" disabled>
                Link desabilitado
              </Button>
            </div>
          </State>
          <State label="Texto longo">
            <div className="max-w-sm">
              <Button arrow className="w-full">
                Agendar uma consulta de avaliação completa pelo WhatsApp
              </Button>
            </div>
          </State>
        </Section>

        <Section
          id="magnetic"
          title="MagneticButton"
          note="Client Component. Mouse: puxa até 6px em direção ao cursor e o preenchimento nasce do ponto de entrada. Toque: ripple. Reduced motion: sem deslocamento nem ripple, só fade."
        >
          <div className="flex flex-wrap gap-4">
            <MagneticButton size="lg" arrow>
              {site.hero.primaryCta}
            </MagneticButton>
            <MagneticButton variant="secondary" size="lg" href="#about-demo">
              {site.hero.secondaryCta.label}
            </MagneticButton>
            <MagneticButton disabled>Desabilitado</MagneticButton>
          </div>
        </Section>

        <Section
          id="card"
          title="Card"
          note="Server Component com ilha client (PointerGlow) só para --mx/--my. Hover: sobe 6px, borda Areia → Rosé, sombra quente e brilho radial. Foco em um link interno produz o mesmo estado."
        >
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card as="li">
              <p className="kicker">Estático</p>
              <h3 className="mt-2 text-2xl">Card sem interação</h3>
              <p className="mt-2 text-cacau/85">Apenas superfície, sem hover.</p>
            </Card>
            <Card as="li" interactive>
              <p className="kicker">Interativo</p>
              <h3 className="mt-2 text-2xl">Escuta sem pressa</h3>
              <p className="mt-2 text-cacau/85">Passe o mouse para ver o brilho seguir o cursor.</p>
            </Card>
            <Card as="li" interactive>
              <p className="kicker">Com link</p>
              <h3 className="mt-2 text-2xl">Foco por teclado</h3>
              <p className="mt-2 text-cacau/85">
                <a href="#chip" className="underline decoration-rose underline-offset-4">
                  Link interno
                </a>{" "}
                — ao focar com Tab, o card inteiro responde.
              </p>
            </Card>
            <Card as="li" interactive className="md:col-span-2 lg:col-span-3">
              <p className="kicker">Texto longo</p>
              <h3 className="mt-2 text-2xl">
                Conduta baseada em evidência científica e acompanhamento
              </h3>
              <p className="mt-2 measure text-cacau/85">{LONG_TEXT}</p>
            </Card>
          </ul>
        </Section>

        <Section
          id="chip"
          title="Chip"
          note="Porcelana → Terracota com texto branco em 180ms (hover, foco e selecionado). Selecionado também mostra ✓ e aria-pressed."
        >
          <State label="Toggle (selecionado / não selecionado)">
            <ChipToggleDemo />
          </State>
          <State label="Com dica “quando procurar” (Tooltip)">
            <div className="flex flex-wrap gap-2">
              <Chip hint="Exemplo de dica curta.">Acne</Chip>
              <Chip hint={LONG_TEXT}>Dica longa</Chip>
              <Chip hint="Perto da borda: a dica é reposicionada para não sair da tela.">
                Borda
              </Chip>
            </div>
          </State>
          <State label="Estático e disabled">
            <div className="flex flex-wrap gap-2">
              <Chip static>Estático (span)</Chip>
              <Chip disabled>Desabilitado</Chip>
              <Chip>Rótulo de condição com texto mais longo</Chip>
            </div>
          </State>
        </Section>

        <Section
          id="tooltip"
          title="Tooltip"
          note="Client Component. Abre no hover (mouse), no foco por teclado e no toque; fecha com Esc, ao sair ou tocar fora. O texto fica sempre ligado via aria-describedby."
        >
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Dica acima do gatilho.">
              <button
                type="button"
                className="min-h-11 rounded-pill border border-areia px-5 text-sm font-semibold"
              >
                Tooltip em cima
              </button>
            </Tooltip>
            <Tooltip content="Dica abaixo do gatilho." placement="bottom">
              <button
                type="button"
                className="min-h-11 rounded-pill border border-areia px-5 text-sm font-semibold"
              >
                Tooltip embaixo
              </button>
            </Tooltip>
            <Tooltip content={LONG_TEXT}>
              <button
                type="button"
                className="min-h-11 rounded-pill border border-areia px-5 text-sm font-semibold"
              >
                Texto longo
              </button>
            </Tooltip>
          </div>
        </Section>

        <Section
          id="accordion"
          title="Accordion"
          note="grid-template-rows 0fr → 1fr; “+” gira 45° e vira “×”. Setas ↑/↓, Home e End navegam entre os títulos."
        >
          <State label="Single (abre um, fecha os outros) — primeiro aberto">
            <Accordion
              defaultOpen={["a1"]}
              items={[
                {
                  id: "a1",
                  title: "A consulta é particular ou atende convênio?",
                  content: <p>{site.faq.items[0]?.answer}</p>,
                },
                {
                  id: "a2",
                  title:
                    "Pergunta com título bem mais longo para validar a quebra de linha em telas de 360px",
                  content: <p>{LONG_TEXT}</p>,
                },
                {
                  id: "a3",
                  title: "Item desabilitado",
                  content: <p>Indisponível.</p>,
                  disabled: true,
                },
                {
                  id: "a4",
                  title: "Quanto tempo dura a consulta?",
                  content: <p>Resposta curta.</p>,
                },
              ]}
            />
          </State>
          <State label="Multiple (vários abertos)">
            <Accordion
              type="multiple"
              items={site.services.items.map((area) => ({
                id: area.slug,
                title: area.title,
                content: <p>{area.services.slice(0, 3).join(", ")}…</p>,
              }))}
            />
          </State>
        </Section>

        <Section
          id="tabs"
          title="Tabs"
          note="Ativação automática, tabindex móvel, setas ←/→, Home e End. Lista rola na horizontal em telas estreitas. Painel entra com fade + 12px."
        >
          <State label="Não controlado (locais) — com aba desabilitada">
            <Tabs
              label="Locais de atendimento"
              items={[
                { id: "centro", label: "Centro", content: <p>Rua Exemplo, 100 · Centro</p> },
                { id: "bairro", label: "Bairro", content: <p>Av. Exemplo, 200 · Bairro</p> },
                { id: "x", label: "Indisponível", content: <p />, disabled: true },
                { id: "long", label: "Aba com rótulo bem mais longo", content: <p>{LONG_TEXT}</p> },
              ]}
            />
          </State>
          <State label="Controlado externamente">
            <ControlledTabsDemo />
          </State>
        </Section>

        <Section
          id="marquee"
          title="Marquee"
          note="CSS puro. Pausa no hover, no foco interno e pelo controle “Pausar animação” (WCAG 2.2.2). Reduced motion: lista estática."
        >
          <div className="rounded-card bg-areia/60 py-5">
            <Marquee label="Credenciais" items={site.credentials.items.map((c) => c.label)} />
          </div>
          <div className="rounded-card bg-areia/60 py-5">
            <Marquee
              label="Exemplo rápido"
              duration={18}
              items={[
                "Item curto",
                "Item com texto um pouco mais longo",
                "Terceiro",
                "Quarto item",
              ]}
            />
          </div>
        </Section>

        <Section
          id="timeline"
          title="Timeline"
          note="CSS puro com :has(). Hover em um marco amplia o ano e preenche o conector até ele. As descrições ficam sempre visíveis — o hover só dá ênfase."
        >
          <Timeline
            label="Formação (exemplo)"
            items={site.about.timeline.map((t) => ({
              year: t.year,
              title: t.title,
              description: t.description ?? LONG_TEXT,
            }))}
          />
        </Section>

        <Section
          id="fab"
          title="WhatsAppFab"
          note="Fixo no canto inferior direito (veja a tela) e versão estática abaixo. Rótulo aparece no hover e no foco. Na landing, o link vem de lib/whatsapp.ts."
        >
          <div id="about-demo" className="flex justify-end rounded-card bg-areia/60 p-6">
            <WhatsAppFab href="#fab" position="static" />
          </div>
        </Section>
      </main>

      {/* Demo link — the landing builds the real wa.me URL in lib/whatsapp.ts. */}
      <WhatsAppFab href="#fab" />
    </>
  );
}
