import { $, component$, useSignal, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { v4 as uuid } from "uuid";
import { Maximize2Icon } from "lucide-qwik";

import type { ITask } from "~/models";
import storage from "~/storage";

import type { NewTask } from "./create-task.types";
import { inputTitlePattern } from "./create-task.entity";
import CreateTaskModal from "./create-task-modal";
import styles from "./create-task.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const modalIsOpen = useSignal<boolean>(false);

  const taskInfo: NewTask = useStore({
    title: "",
    description: "",
    isDone: false,
  });

  const handleTitleOnInput = $((_: Event, element: HTMLInputElement) => {
    taskInfo.title = element.value;
  });

  const handleSave = $(async () => {
    if (taskInfo.title === "") return;
    const newTask: ITask = {
      id: uuid(),
      creation_date: new Date(),
      ...taskInfo,
    };
    await storage.tasks.saveTask(newTask);
    // TODO[epic=feature]
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
