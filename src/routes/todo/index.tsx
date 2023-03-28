import { $, component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import type { ITask } from "~/models";
import { getTasks } from "~/hooks/task.hooks";

import styles from "./todo.css?inline";

import Task from "./components/task/task";
import CreateTask from "./components/create-task/create-task";

export default component$(() => {
  useStylesScoped$(styles);

  const tasks = useSignal<ITask[]>([]);

  const updateTaskList = $(() => {
    if (isServer) return;
    const taskList = getTasks();
    tasks.value = taskList;
  });

  useVisibleTask$(() => {
    updateTaskList();
  });

  return (
    <main class="main">
      <div class="task-list">
        {tasks.value.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <CreateTask onTasksIsCreated={updateTaskList} />
      </div>
    </main>
  );
});
