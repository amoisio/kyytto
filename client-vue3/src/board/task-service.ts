import { ITask } from "./task-item";

export interface ITaskService {
  create(project: ITask): void;
  getAll(): ITask[];
  getById(id: string): ITask;
  update(task: ITask): void;
  remove(task: ITask): void;
}

export class TaskService implements ITaskService {
  create(project: ITask): void {
    throw new Error("Method not implemented.");
  }

  getAll(): ITask[] {
    throw new Error("Method not implemented.");
  }

  getById(id: string): ITask {
    throw new Error("Method not implemented.");
  }

  update(task: ITask): void {
    throw new Error("Method not implemented.");
  }

  remove(task: ITask): void {
    throw new Error("Method not implemented.");
  }
}
