import type { PropFunction } from "@builder.io/qwik";
import { $, component$, Slot, useVisibleTask$ } from "@builder.io/qwik";

import styles from "./modal.module.css";

interface Props {
  isOpen: boolean;
  onClickOutside?: PropFunction<() => unknown>;
}
export const Modal = component$(({ isOpen, onClickOutside }: Props) => {
  const handleOverlayClick = $((event: MouseEvent) => {
    if (!onClickOutside || !event.target || !isOpen) return;

    const target = event.target as HTMLElement;
    if (target.id === "modal-overlay") onClickOutside();
  });

  useVisibleTask$(({ track }) => {
    track(() => isOpen);

    if (isOpen) document.addEventListener("click", handleOverlayClick);
    else document.removeEventListener("click", handleOverlayClick);
  });

  return (
    <div id="modal-overlay" class={styles.overlay} style={`display: ${isOpen ? "flex" : "none"}`}>
      <div id="modal-wrapper" class={styles["modal-wrapper"]}>
        <Slot />
      </div>
    </div>
  );
});

export default Modal;
