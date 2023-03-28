import { isServer } from "@builder.io/qwik/build";

import type { ITask } from "~/models";

// TODO[epic=feature] Change storage for a backend
const storageName = "sessionStorage" as const;

export async function getTasks(): Promise<ITask[]> {
  if (isServer) return [];
  const rawTasks = globalThis[storageName].getItem("tasks");
  if (!rawTasks) return [];
  return JSON.parse(rawTasks);
}

export async function saveTask(taskToSave: ITask): Promise<void> {
  const tasks = await getTasks();
  globalThis[storageName].setItem("tasks", JSON.stringify([...tasks, taskToSave]));
}
