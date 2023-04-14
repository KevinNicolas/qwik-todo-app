import type { IDatabase } from "~/interfaces";
import type { TaskModel } from "~/models";

export class ApiService implements IDatabase {
  constructor() {}

  public createTask(taskToCreate: Omit<TaskModel, "id" | "creation_date">) {
    return "" as any;
  }

  public getAllTask() {
    return "" as any;
  }

  public getTask(taskId: TaskModel["id"]) {
    return "" as any;
  }
}
