import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Thin-stroke icons. Decorative by default.
function base(props: IconProps): IconProps {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 8h16M4 16h10" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Outline star — never filled, so it can't be read as a rating value. */
export function StarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Generic chat bubble with handset — swap for the official WhatsApp glyph if desired. */
export function ChatIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 19.5l1.1-3.6A8 8 0 1 1 8.4 18.6z" />
      <path d="M9.2 8.6c.2-.4.6-.4.8-.1l.9 1.4c.1.2.1.5-.1.7l-.5.5c.4.9 1.2 1.8 2.2 2.3l.5-.5c.2-.2.5-.2.7-.1l1.4.9c.3.2.3.6-.1.8-.6.5-1.4.7-2.2.4a7 7 0 0 1-3.9-3.9c-.3-.8-.1-1.7.3-2.4z" />
    </svg>
  );
}
