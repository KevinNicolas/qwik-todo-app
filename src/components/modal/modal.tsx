import { component$, Slot } from "@builder.io/qwik";

import styles from "./modal.module.css";

interface Props {
  isOpen: boolean;
}
export const Modal = component$(({ isOpen }: Props) => {
  return (
    <div id="modal-overlay" class={styles.overlay} style={`display: ${isOpen ? "flex" : "none"}`}>
      <div id="modal-wrapper" class={styles["modal-wrapper"]}>
        <Slot />
      </div>
    </div>
  );
});

export default Modal;
