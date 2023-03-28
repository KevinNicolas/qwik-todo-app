import type { Signal, PropFunction } from "@builder.io/qwik";
import type { ITask } from "~/models";

import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import { XIcon } from "lucide-qwik";

import { Modal, Button } from "~/components";

import styles from "./create-task-modal.css?inline";

interface Props {
  isOpen: Signal<boolean>;
  taskInfo: Signal<Partial<ITask>>;
  resetTaskInfo: PropFunction<() => void>;
  saveTask: PropFunction<() => void>;
}

export default component$(({ isOpen, taskInfo, resetTaskInfo, saveTask }: Props) => {
  useStylesScoped$(styles);

  return (
    <Modal isOpen={isOpen.value}>
      <div class="modal-container">
        <button class="close-button" onClick$={() => (isOpen.value = false)}>
          <XIcon color="#111" />
        </button>
        <form>
          <input
            class="title"
            type="text"
            placeholder="Task title..."
            onInput$={(_, element) => (taskInfo.value = { ...taskInfo.value, title: element.value })}
            value={taskInfo.value.title}
            required
            pattern="^\w\S{2,}"
          />
          <textarea
            name="description"
            cols={30}
            rows={10}
            class="description"
            placeholder="Description..."
            onInput$={(_, element) => (taskInfo.value = { ...taskInfo.value, description: element.value })}
            value={taskInfo.value.description}
          ></textarea>
        </form>
        <div class="footer">
          <Button
            onclick={$(() => {
              isOpen.value = false;
              resetTaskInfo();
            })}
            type="outline"
          >
            Cancel
          </Button>
          <Button onclick={$(() => saveTask())} type="full">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
});
