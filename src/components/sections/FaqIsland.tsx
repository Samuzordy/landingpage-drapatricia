"use client";

import type { ReactNode } from "react";
import { LazyIsland } from "@/components/motion/LazyIsland";
import type { AccordionProps } from "@/components/ui/Accordion";

const load = () => import("@/components/ui/Accordion").then((m) => m.Accordion);

/** Loads the interactive accordion only when the FAQ approaches the viewport. */
export function FaqIsland({ children, ...props }: AccordionProps & { children: ReactNode }) {
  return (
    <LazyIsland load={load} props={props}>
      {children}
    </LazyIsland>
  );
}
