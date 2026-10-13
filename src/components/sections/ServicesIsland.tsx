"use client";

import type { ReactNode } from "react";
import { LazyIsland } from "@/components/motion/LazyIsland";
import type { ServiceCardData } from "./ServiceCardsView";

const load = () => import("./ServiceCards").then((m) => m.ServiceCards);

/** Loads the interactive service cards only when the section approaches the viewport. */
export function ServicesIsland({
  services,
  children,
}: {
  services: ServiceCardData[];
  children: ReactNode;
}) {
  return (
    <LazyIsland load={load} props={{ services }}>
      {children}
    </LazyIsland>
  );
}
