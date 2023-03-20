import { $, component$, useSignal } from "@builder.io/qwik";
import { Maximize2Icon } from "lucide-qwik";

import type { ITask } from "~/models";

import CreateTaskModal from "./create-task-modal";

import styles from "./create-task.module.css";

export default component$(() => {
  const modalIsOpen = useSignal<boolean>(false);
  const taskInfo = useSignal<Pick<ITask, "title">>({ title: "" });

  const handleOnInput = $((_: Event, element: HTMLInputElement) => {
    taskInfo.value = {
      ...taskInfo.value,
      title: element.value,
    };
  });

  return (
    <>
      <div class={styles["create-task-container"]}>
        <input type="checkbox" />
        {/* FIXME - remove any type */}
        <input class={styles["text-input"]} type="text" placeholder="New task..." onInput$={handleOnInput} />
        <button class={styles.button} onClick$={() => (modalIsOpen.value = true)}>
          <Maximize2Icon size={18} />
        </button>
      </div>
      <CreateTaskModal isOpen={modalIsOpen} taskInfo={taskInfo} />
    </>
  );
});
