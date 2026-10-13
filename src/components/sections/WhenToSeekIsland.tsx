"use client";

import type { ReactNode } from "react";
import { LazyIsland } from "@/components/motion/LazyIsland";
import type { ConditionChipsProps } from "./ConditionChips";

const load = () => import("./ConditionChips").then((m) => m.ConditionChips);

/** Loads tooltip + bottom sheet only when the section approaches the viewport. */
export function WhenToSeekIsland({
  children,
  ...props
}: ConditionChipsProps & { children: ReactNode }) {
  return (
    <LazyIsland load={load} props={props}>
      {children}
    </LazyIsland>
  );
}
