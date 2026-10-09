"use client";

import type { ReactNode } from "react";
import { LazyIsland } from "@/components/motion/LazyIsland";
import type { SkinJourneyInteractiveProps } from "./SkinJourneyInteractive";

const load = () => import("./SkinJourneyInteractive").then((m) => m.SkinJourneyInteractive);

/** Loads the interactive Jornada only when the section approaches the viewport. */
export function SkinJourneyIsland({
  children,
  ...props
}: SkinJourneyInteractiveProps & { children: ReactNode }) {
  return (
    <LazyIsland load={load} props={props}>
      {children}
    </LazyIsland>
  );
}
