import { component$, Signal } from "@builder.io/qwik";

import { Modal } from "~/components";
import type { ITask } from "~/models";

// import styles from "./create-task-modal.module.css";

interface Props {
  isOpen: Signal<boolean>;
  taskInfo: Signal<Partial<ITask>>;
}

export default component$(({ isOpen, taskInfo }: Props) => {
  return (
    <Modal isOpen={isOpen.value}>
      <button onClick$={() => (isOpen.value = false)}>
        <span>CLOSE</span>
      </button>
      <h2>{taskInfo.value.title ?? "Sin titulo"}</h2>
    </Modal>
  );
});
