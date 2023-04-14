import { v4 as uuid } from "uuid";

import type { IDatabase } from "~/interfaces";
import type { TaskModel } from "~/models";

export class WebStorageServices implements IDatabase {
  constructor(readonly _storageName: Readonly<"sessionStorage" | "localStorage"> = "sessionStorage") {}

  private _getItem<T = any>(itemName: string): T | null {
    const itemValue = globalThis[this._storageName].getItem(itemName);

    if (!itemValue) return null;
    return JSON.parse(itemValue);
  }

  private _setItem(itemName: string, itemValue: unknown): void {
    globalThis[this._storageName].setItem(itemName, JSON.stringify(itemValue));
  }

  public async createTask(taskToCreate: Omit<TaskModel, "id" | "creation_date">) {
    const newTask: TaskModel = { id: uuid(), creation_date: new Date(), ...taskToCreate };

    const updatedTasks = [...(await this.getAllTask()), newTask];

    this._setItem("tasks", updatedTasks);
  }

  public async getAllTask() {
    const tasks = this._getItem<TaskModel[]>("tasks");
    if (!tasks) return [];
    return tasks;
  }

  public async getTask(taskId: TaskModel["id"]) {
    const task = (await this.getAllTask()).find(({ id }) => id === taskId);
    return task ?? null;
  }
}

export default WebStorageServices;
