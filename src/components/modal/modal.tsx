import { component$, Slot } from "@builder.io/qwik";

import styles from "./modal.module.css";

interface Props {
  isOpen: boolean;
}
export const Modal = component$(({ isOpen }: Props) => {
  return (
    <div class={styles.overlay} style={`display: ${isOpen ? "flex" : "none"}`}>
      <div class={styles["modal-wrapper"]}>
        <Slot />
      </div>
    </div>
  );
});

export default Modal;
