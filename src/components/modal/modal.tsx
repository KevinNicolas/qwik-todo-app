import type { PropFunction } from "@builder.io/qwik";
import { $, component$, Slot, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import styles from "./modal.module.css";

interface Props {
  isOpen: boolean;
  onClickOutside?: PropFunction<() => unknown>;
}
export const Modal = component$(({ isOpen, onClickOutside }: Props) => {
  const handleClickOutside = $((event: MouseEvent) => {
    const element = event.target as HTMLDivElement;
    if (onClickOutside && element.id === "modal-overlay") onClickOutside();
  });

  useTask$(({ track }) => {
    track(() => isOpen);
    if (isServer) return;
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return;
    }
    document.removeEventListener("click", handleClickOutside);
  });

  return (
    <div id="modal-overlay" class={styles.overlay} style={`display: ${isOpen ? "flex" : "none"}`}>
      <div class={styles["modal-wrapper"]}>
        <Slot />
      </div>
    </div>
  );
});

export default Modal;
