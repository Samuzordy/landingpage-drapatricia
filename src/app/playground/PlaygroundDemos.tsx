"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Tabs } from "@/components/ui/Tabs";

// Interactive demos that need local state (Server Components can't pass onClick handlers).

const CONDITIONS = ["Acne", "Rosácea", "Melasma", "Queda de cabelo", "Pintas e sinais"];

export function ChipToggleDemo() {
  const [selected, setSelected] = useState<string[]>(["Melasma"]);
  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CONDITIONS.map((name) => (
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
  const [value, setValue] = useState("derme");
  const layers = [
    { id: "epiderme", label: "Epiderme" },
    { id: "derme", label: "Derme" },
    { id: "hipoderme", label: "Hipoderme" },
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
        label="Camadas da pele (controlado)"
        value={value}
        onValueChange={setValue}
        items={layers.map((l) => ({
          id: l.id,
          label: l.label,
          content: (
            <p className="text-cacau/85">
              Painel controlado externamente: <strong>{l.label}</strong>. Simula a sincronização
              entre o hover na ilustração e as abas da Jornada da Pele (Etapa 5).
            </p>
          ),
        }))}
      />
    </div>
  );
}
