import { v4 as uuidv4 } from 'uuid';
import { ResourceReference } from "@/iresource";
import { IProject } from "@/projects/project-models";
import { ITask } from "./task-models";
import { TaskState } from "./task-state";
import { ITaskService } from "./itask-service";
import { LocalStorageRepository } from "@/local-storage-repository";
export class LocalStorageTaskService implements ITaskService {
  private repository: LocalStorageRepository<ITask>;
  constructor() {
    this.repository = new LocalStorageRepository<ITask>('tasks');
  }

  create(title: string, description: string | undefined, project: IProject): ITask {
    const id = uuidv4();
    const task = this.createTask(id, title, description, project.href);
    this.repository.add(task);
    return task;
  }

  private createTask(
    id: string,
    title: string,
    description: string | undefined,
    projectHref: ResourceReference
  ): ITask {
    return {
      href: `http://localhost:8080/api/tasks/${id}`,
      title: title,
      description: description,
      projectHref: projectHref,
      state: TaskState.Todo
    } as ITask;
  }

  public getAll(): ITask[] {
    return this.repository.getAll();
  }

  public getById(id: string): ITask {
    return this.repository.getById(id);
  }

  public update(task: ITask): void {
    this.repository.update(task);
  }

  public remove(id: string): void {
    this.repository.remove(id);
  }
}
