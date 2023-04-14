export interface TaskModel {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  creation_date: Date;
  finish_date?: Date;
}
