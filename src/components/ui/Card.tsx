import type { HTMLAttributes, ReactNode } from "react";
import { PointerGlow } from "./PointerGlow";

type CardElement = "div" | "article" | "li" | "section";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: CardElement;
  /**
   * Content card: lifts 6px with warm shadow, border Areia → Rosé,
   * radial glow following the cursor (--mx / --my). The same lift applies when a child
   * receives keyboard focus; touch gets press feedback (scale .98).
   */
  interactive?: boolean;
  children: ReactNode;
};

/** Text/content card. Server Component; only the glow tracker is a client island. */
export function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      {...rest}
      data-interactive={interactive || undefined}
      className={`card relative rounded-card border bg-porcelana p-6 md:p-8 ${className}`}
    >
      {interactive && <PointerGlow />}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
