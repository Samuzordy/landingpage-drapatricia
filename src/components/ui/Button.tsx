import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/**
 * primary / secondary for light bands; light / outline-light for the dark Hipoderme bands
 * (terracota and darker), where terracota fills would disappear.
 */
export type ButtonVariant = "primary" | "secondary" | "light" | "outline-light";
export type ButtonSize = "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow that slides 4px on hover / keyboard focus. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  /**
   * The action isn't available yet (e.g. WhatsApp number pending). Renders a focusable
   * <button aria-disabled> at full opacity, never a link — pair it with aria-describedby.
   */
  pending?: boolean;
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
  pending = false,
}: Pick<CommonProps, "variant" | "size" | "className" | "pending">) {
  return [
    "btn group",
    `btn-${variant}`,
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-pill font-sans font-semibold tracking-[0.01em] select-none",
    "transition-[color,background-color,border-color,scale,translate] duration-(--dur-fast) ease-skin",
    pending ? "cursor-not-allowed" : "aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
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
  if (props.pending) return <PendingButton {...props} />;

  if (props.href !== undefined) {
    const {
      variant,
      size,
      arrow,
      children,
      className,
      external,
      disabled,
      href,
      pending,
      ...rest
    } = props;
    void pending;
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

  const {
    variant,
    size,
    arrow,
    children,
    className,
    type = "button",
    disabled,
    pending,
    ...rest
  } = props;
  void pending;
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

/** Shared by Button and MagneticButton for the `pending` state. */
export function PendingButton({
  variant,
  size,
  arrow,
  children,
  className,
  id,
  "aria-describedby": describedBy,
}: ButtonProps) {
  return (
    <button
      type="button"
      id={id}
      aria-disabled="true"
      aria-describedby={describedBy}
      data-pending=""
      className={buttonClasses({ variant, size, className, pending: true })}
    >
      <ButtonContent arrow={arrow}>{children}</ButtonContent>
    </button>
  );
}
