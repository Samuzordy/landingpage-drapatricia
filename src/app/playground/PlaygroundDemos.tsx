"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Tabs } from "@/components/ui/Tabs";

// Interactive demos that need local state (Server Components can't pass onClick handlers).

const OPTIONS = ["Check-up", "Segunda opinião", "Retorno", "Resultados de exames", "Prevenção"];

export function ChipToggleDemo() {
  const [selected, setSelected] = useState<string[]>(["Retorno"]);
  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((name) => (
          <Chip key={name} selected={selected.includes(name)} onClick={() => toggle(name)}>
            {name}
          </Chip>
        ))}
      </div>
      <p className="mt-3 text-sm text-cacau/80" aria-live="polite">
        Selecionados: {selected.length ? selected.join(", ") : "nenhum"}
      </p>
    </div>
  );
}

export function ControlledTabsDemo() {
  const [value, setValue] = useState("avaliacao");
  const layers = [
    { id: "contato", label: "Contato" },
    { id: "avaliacao", label: "Avaliação" },
    { id: "plano", label: "Plano" },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" aria-hidden="true">
        {layers.map((l) => (
          <button
            key={l.id}
            type="button"
            tabIndex={-1}
            onMouseEnter={() => setValue(l.id)}
            className="rounded-card border border-dashed border-rose px-4 py-3 text-sm text-cacau/80"
          >
            Hover externo: {l.label}
          </button>
        ))}
      </div>
      <Tabs
        label="Etapas (controlado)"
        value={value}
        onValueChange={setValue}
        items={layers.map((l) => ({
          id: l.id,
          label: l.label,
          content: (
            <p className="text-cacau/85">
              Painel controlado externamente: <strong>{l.label}</strong>. Simula a sincronização
              entre o hover em uma ilustração e as abas (padrão usado no SpecialtyFeature).
            </p>
          ),
        }))}
      />
    </div>
  );
}
