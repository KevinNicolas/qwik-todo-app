import { component$ } from "@builder.io/qwik";

import type { ITask } from "~/models";

import { main, taskList } from "./todo.css";

import Task from "./components/task/task";
import CreateTask from "./components/create-task/create-task";

export default component$(() => {
  const tasks: ITask[] = [
    {
      title: "Primer prueba de una task",
      description: "es la primer prueba de una task, se esta creando el componente",
      isDone: false,
      creation_date: new Date(),
    },
  ];

  return (
    <main class={main}>
      <div class={taskList}>
        {tasks.map((task) => (
          <Task key={task.creation_date.toISOString()} task={task} />
        ))}
        <CreateTask />
      </div>
    </main>
  );
});
