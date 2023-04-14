import type { TaskModel } from "~/models";

export interface IDatabase {
  createTask: (taskToCreate: Omit<TaskModel, "id" | "creation_date">) => Promise<void>;
  getAllTask: () => Promise<TaskModel[]>;
  getTask: (taskId: TaskModel["id"]) => Promise<TaskModel | null>;
}
