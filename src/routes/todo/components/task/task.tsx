import { component$, useStylesScoped$ } from "@builder.io/qwik";

import type { TaskModel } from "~/models";

import styles from "./task.css?inline";

interface Props {
  task: TaskModel;
}

export default component$(({ task }: Props) => {
  useStylesScoped$(styles);

  return (
    <div class="task-container">
      <input type="checkbox" checked={task.isDone} />
      <span>{task.title}</span>
    </div>
  );
});
