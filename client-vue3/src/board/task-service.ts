import { IProject, IProjectResource, Project } from '@/projects/project-models';
import { ITask, ITaskResource, Task } from './task-models';
import { LocalStorageRepository } from '@/local-storage-repository';
import { IService } from '@/iservice';
import { parse } from '@/lib/hrefParser';
import { LocalStorage } from '@/local-storage';
import * as mappers from '@/mappers';

export class LocalStorageTaskService implements IService<ITask> {
  private readonly taskRepository: LocalStorageRepository<ITaskResource>;
  private readonly projectRepository: LocalStorageRepository<IProjectResource>;

  constructor(store: LocalStorage) {
    this.taskRepository = store.taskRepository;
    this.projectRepository = store.projectRepository;
  }

  public create(newTask: ITask): ITask {
    const item = mappers.taskResourceMapper(newTask);
    const id = this.taskRepository.add(item);
    return this.getById(id);
  }

  public getAll(): ITask[] {
    const items = this.taskRepository.getAll();
    return items.map(item => this.getTask(item));
  }

  public getById(id: string): ITask {
    const item = this.taskRepository.getById(id);
    return this.getTask(item);
  }

  private getTask(taskItem: ITaskResource) : ITask {
    let project: IProject | undefined;
    if (taskItem.projectHref) {
      const projectId = parse(taskItem.projectHref).id;
      const projectItem = this.projectRepository.getById(projectId);
      project = Project.createFrom(projectItem);
    }

    return Task.createFrom(taskItem, project);
  }

  public update(task: ITask): void {
    const item = mappers.taskResourceMapper(task);
    this.taskRepository.update(item);
  }

  public remove(id: string): void {
    this.taskRepository.remove(id);
  }
}
