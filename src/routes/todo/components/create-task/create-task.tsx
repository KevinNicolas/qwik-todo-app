import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { Maximize2Icon } from "lucide-qwik";

import type { ITask } from "~/models";

import CreateTaskModal from "./create-task-modal";

import styles from "./create-task.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
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
      <div class="create-task-container">
        <input type="checkbox" />
        <input class="text-input" type="text" placeholder="New task..." onInput$={handleOnInput} value={taskInfo.value.title} />
        <button class="button" onClick$={() => (modalIsOpen.value = true)}>
          <Maximize2Icon size={18} />
        </button>
      </div>
      <CreateTaskModal isOpen={modalIsOpen} taskInfo={taskInfo} />
    </>
  );
});
