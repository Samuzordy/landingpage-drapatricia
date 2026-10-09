"use client";

import { useEffect, useId, useRef, type ReactNode, type RefObject } from "react";
import { CloseIcon } from "./icons";

export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  kicker?: ReactNode;
  children: ReactNode;
  /** Element that receives focus back on close (usually the trigger). */
  returnFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Modal bottom sheet on top of the native <dialog> + showModal():
 * - the browser makes everything outside inert (focus can't leave) and Esc closes it;
 * - focus starts on the close button and returns to `returnFocusRef` on close;
 * - the page behind doesn't scroll while it's open; tapping the backdrop closes it;
 * - enters with a slide + fade (fade only with reduced motion).
 */
export function BottomSheet({
  open,
  onClose,
  title,
  kicker,
  children,
  returnFocusRef,
}: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const returnTo = returnFocusRef?.current;
    return () => {
      html.style.overflow = previousOverflow;
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, returnFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Esc → "cancel" → native close → sync React state.
      onClose={onClose}
      // A click whose target is the <dialog> itself landed on the backdrop.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="sheet"
    >
      <div className="sheet-body">
        <div aria-hidden="true" className="mx-auto mb-5 h-1 w-10 rounded-pill bg-areia" />
        <div className="flex items-start justify-between gap-4">
          <div>
            {kicker && <p className="kicker">{kicker}</p>}
            <h2 id={titleId} className="mt-2 text-[1.875rem] leading-tight">
              {title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-pill px-3 text-sm font-semibold text-cacau"
          >
            <CloseIcon />
            Fechar
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </dialog>
  );
}
