import type { IDatabase } from "~/interfaces";
import type { TaskModel } from "~/models";

import { WebStorageServices, ApiService } from "~/services";

export class StorageService implements IDatabase {
  private _database: IDatabase;

  constructor(readonly databaseType: Readonly<"localStorage" | "sessionStorage" | "api">) {
    switch (databaseType) {
      case "api":
        this._database = new ApiService();
        break;
      case "sessionStorage":
        this._database = new WebStorageServices("sessionStorage");
        break;
      case "localStorage":
        this._database = new WebStorageServices("localStorage");
        break;
      default:
        this._database = new WebStorageServices("sessionStorage");
    }
  }

  public async createTask(taskToCreate: Omit<TaskModel, "id" | "creation_date">) {
    return this._database.createTask(taskToCreate);
  }

  public async getAllTask() {
    return this._database.getAllTask();
  }

  public async getTask(taskId: TaskModel["id"]) {
    return this._database.getTask(taskId);
  }
}
