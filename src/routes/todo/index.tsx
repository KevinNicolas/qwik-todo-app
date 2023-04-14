import { $, component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";

import type { TaskModel } from "~/models";
import { StorageService } from "~/services";

import styles from "./todo.css?inline";

import Task from "./components/task/task";
import CreateTask from "./components/create-task/create-task";

export default component$(() => {
  useStylesScoped$(styles);

  const tasks = useSignal<TaskModel[]>([]);

  useVisibleTask$(async () => {
    tasks.value = await new StorageService("sessionStorage").getAllTask();
  });

  const handleCreateTask = $(async (taskInfo: TaskModel) => {
    console.info("Saving task", taskInfo);
    if (taskInfo.title === "") return;

    await new StorageService("sessionStorage").createTask({ ...taskInfo } as TaskModel);
    // TODO[epic=feature]
  });

  return (
    <main class="main">
      <div class="task-list">
        {tasks.value.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <CreateTask onCreateTask={handleCreateTask} />
      </div>
    </main>
  );
});
