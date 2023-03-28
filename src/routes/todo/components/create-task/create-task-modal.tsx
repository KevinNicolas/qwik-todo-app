import type { PropFunction, Signal } from "@builder.io/qwik";

import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import { XIcon } from "lucide-qwik";

import { Modal, Button } from "~/components";

import type { NewTask } from "./create-task.types";
import styles from "./create-task-modal.css?inline";

interface Props {
  isOpen: Signal<boolean>;
  taskInfo: NewTask;
  resetTaskInfo: PropFunction<() => void>;
}

export default component$(({ isOpen, taskInfo, resetTaskInfo }: Props) => {
  useStylesScoped$(styles);

  const handleOnClickOutside = $(() => {
    isOpen.value = false;
  });

  return (
    <Modal isOpen={isOpen.value} onClickOutside={handleOnClickOutside}>
      <div class="modal-container">
        <button class="close-button" onClick$={() => (isOpen.value = false)}>
          <XIcon color="#111" />
        </button>
        <form>
          <input
            class="title"
            type="text"
            placeholder="Task title..."
            onInput$={(_, element) => (taskInfo.title = element.value)}
            value={taskInfo.title}
            required
            pattern="^\w\S{2,}"
          />
          <textarea
            name="description"
            cols={30}
            rows={10}
            class="description"
            placeholder="Description..."
            onInput$={(_, element) => (taskInfo.description = element.value)}
            value={taskInfo.description}
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
          <Button onclick={$(() => {})} type="full">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
});
