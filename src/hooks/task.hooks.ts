import { v4 as uuid } from "uuid";

import type { ITask } from "~/models";

const storageType = "sessionStorage" as const;

export function getTasks(): ITask[] {
  const rawTask = globalThis[storageType].getItem("tasks");
  return typeof rawTask === "string" ? JSON.parse(rawTask) : [];
}

interface ISaveTaskProps {
  task: Partial<ITask> & Required<Pick<ITask, "title">>;
}
export async function saveTask({ task }: ISaveTaskProps): Promise<ITask | void> {
  if (!globalThis.localStorage) return console.error("LocalStorage is not defined");

  const tasks = getTasks();

  const newTask: ITask = {
    id: uuid(),
    description: "",
    isDone: false,
    ...task,
    creation_date: new Date(),
  };
  globalThis[storageType].setItem("tasks", JSON.stringify([...tasks, newTask]));
  return newTask;
}
