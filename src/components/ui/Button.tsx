import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow that slides 4px on hover / keyboard focus. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** Opens in a new tab with rel="noopener noreferrer". */
    external?: boolean;
    disabled?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-6 text-[0.9375rem]",
  lg: "min-h-13 px-8 text-base",
};

/**
 * Shared visual recipe, also used by MagneticButton.
 * `.btn` (src/styles/components.css) holds the fill layer and press feedback;
 * colors use Tailwind so text/border transitions stay color-only.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: Pick<CommonProps, "variant" | "size" | "className">) {
  return [
    "btn group",
    `btn-${variant}`,
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-pill font-sans font-semibold tracking-[0.01em] select-none",
    "transition-[color,background-color,border-color,scale,translate] duration-(--dur-fast) ease-skin",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    sizeClasses[size],
    className,
  ].join(" ");
}

export function ButtonContent({ children, arrow }: Pick<CommonProps, "children" | "arrow">) {
  return (
    <>
      <span aria-hidden="true" className="btn-fill" />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRightIcon className="relative z-10 shrink-0 transition-transform duration-(--dur-fast) ease-skin group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      )}
    </>
  );
}

/**
 * Primary (terracota) or secondary (outline) action. Renders <a> when `href` is set.
 * CSS-only: hover fill grows from the center; touch gets press scale .97.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, arrow, children, className, external, disabled, href, ...rest } = props;
    return (
      <a
        {...rest}
        // A disabled link has no href, so it is neither focusable nor activatable.
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        target={external ? "_blank" : rest.target}
        rel={external ? "noopener noreferrer" : rest.rel}
        className={buttonClasses({ variant, size, className })}
      >
        <ButtonContent arrow={arrow}>{children}</ButtonContent>
      </a>
    );
  }

  const { variant, size, arrow, children, className, type = "button", disabled, ...rest } = props;
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={buttonClasses({ variant, size, className })}
    >
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}
