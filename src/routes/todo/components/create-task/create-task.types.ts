import type { ITask } from "~/models";

export type NewTask = Omit<ITask, "id" | "creation_date">;
