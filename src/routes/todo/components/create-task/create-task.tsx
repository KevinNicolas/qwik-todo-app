import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { Maximize2Icon } from "lucide-qwik";

import type { ITask } from "~/models";
import { saveTask } from "~/hooks/task.hooks";

import CreateTaskModal from "./create-task-modal";
import styles from "./create-task.css?inline";

interface Props {
  onTasksIsCreated: PropFunction<() => void>;
}

export default component$(({ onTasksIsCreated }: Props) => {
  useStylesScoped$(styles);
  const modalIsOpen = useSignal<boolean>(false);
  const taskInfo = useSignal<Omit<ITask, "id" | "creation_date">>({ title: "", description: "", isDone: false });

  const handleOnInput = $((_: Event, element: HTMLInputElement) => {
    taskInfo.value = {
      ...taskInfo.value,
      title: element.value,
    };
  });

  const resetTaskInfo = $(() => {
    taskInfo.value = {
      title: "",
      description: "",
      isDone: false,
    };
  });

  const saveTaskInfo = $(async () => {
    const newTask = await saveTask({ task: taskInfo.value });
    if (!newTask) return;
    onTasksIsCreated();
    resetTaskInfo();
    modalIsOpen.value = false;
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
      <CreateTaskModal isOpen={modalIsOpen} taskInfo={taskInfo} resetTaskInfo={resetTaskInfo} saveTask={saveTaskInfo} />
    </>
  );
});
