import { IRepository } from "@/irepository";
import { v4 as uuidv4 } from 'uuid';
import { ResourceReference } from "@/iresource";
import { IProject } from "@/projects/project-models";
import { ITask } from "./task-models";
import { TaskState } from "./task-state";

export interface ITaskService {
  create(title: string, description: string | undefined, project: IProject): string;
  getAll(): ITask[];
  getById(id: string): ITask;
  update(task: ITask): void;
  remove(id: string): void;
}

export class TaskService implements ITaskService {
  constructor(private taskRepository: IRepository<ITask>) {}

  create(title: string, description: string | undefined, project: IProject): string {
    const id = uuidv4();
    const task = this.createTask(id, title, description, project.href);
    this.taskRepository.add(task);
    return id;
  }

  private createTask(id: string, title: string, description: string | undefined, projectHref: ResourceReference): ITask {
    return {
      href: `http://localhost:8080/api/tasks/${id}`,
      title: title,
      description: description,
      projectHref: projectHref,
      state: TaskState.Todo
    } as ITask;
  }

  public getAll(): ITask[] {
    return this.taskRepository.getAll();
  }

  public getById(id: string): ITask {
    return this.taskRepository.getById(id);
  }

  public update(task: ITask): void {
    this.taskRepository.update(task);
  }

  public remove(id: string): void {
    this.remove(id);
  }
}
