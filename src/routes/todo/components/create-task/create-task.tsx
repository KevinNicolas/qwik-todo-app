import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { Maximize2Icon } from "lucide-qwik";

import type { TaskModel } from "~/models";
import { inputTitlePattern } from "./create-task.types";
import CreateTaskModal from "./create-task-modal";
import styles from "./create-task.css?inline";

interface Props {
  onCreateTask: PropFunction<(taskToCreate: TaskModel) => unknown>;
}

export default component$(({ onCreateTask }: Props) => {
  useStylesScoped$(styles);
  const modalIsOpen = useSignal<boolean>(false);

  const taskInfo: Omit<TaskModel, "id" | "creation_date"> = useStore({
    title: "",
    description: "",
    isDone: false,
  });

  const handleTitleOnInput = $((_: Event, element: HTMLInputElement) => {
    taskInfo.title = element.value;
  });

  const handleSave = $(() => {
    onCreateTask(taskInfo as TaskModel);
  });

  return (
    <>
      <div class="create-task-container">
        <input type="checkbox" />
        <input class="text-input" type="text" placeholder="New task..." pattern={inputTitlePattern} required onInput$={handleTitleOnInput} value={taskInfo.title} />
        <button class="button" onClick$={() => (modalIsOpen.value = true)}>
          <Maximize2Icon size={18} />
        </button>
        <button class="save-button" onClick$={handleSave}>
          Save
        </button>
      </div>
      <CreateTaskModal isOpen={modalIsOpen} taskInfo={taskInfo} resetTaskInfo={$(() => {})} />
    </>
  );
});
