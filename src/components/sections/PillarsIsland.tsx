"use client";

import type { ReactNode } from "react";
import { LazyIsland } from "@/components/motion/LazyIsland";
import type { PillarCardData } from "./PillarCardsView";

const load = () => import("./PillarCards").then((m) => m.PillarCards);

/** Loads the interactive pillar cards only when the section approaches the viewport. */
export function PillarsIsland({
  pillars,
  children,
}: {
  pillars: PillarCardData[];
  children: ReactNode;
}) {
  return (
    <LazyIsland load={load} props={{ pillars }}>
      {children}
    </LazyIsland>
  );
}
