export interface ITask {
  title: string;
  description: string;
  isDone: boolean;
  creation_date: Date;
  finish_date?: Date;
}
