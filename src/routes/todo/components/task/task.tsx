import { component$ } from "@builder.io/qwik";

import type { ITask } from "~/models";

import styles from "./task.module.css";

interface Props {
  task: ITask;
}

export default component$(({ task }: Props) => {
  return (
    <div class={styles["task-container"]}>
      <input type="checkbox" checked={task.isDone} />
      <span>{task.title}</span>
    </div>
  );
});
