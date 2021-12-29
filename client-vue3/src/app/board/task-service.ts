import { IProject, Project } from '@/app/projects/project-models';
import { ITask, Task } from './task-models';
import { LocalStorageRepository } from '@/shared/local-storage-repository';
import { IService } from '@/shared/iservice';
import { LocalStorage } from '@/shared/local-storage';
import * as mappers from '@/shared/mappers';
import { ProjectResource, TaskResource } from 'kyytto-models';
import { api } from '../api';

export interface ITaskService extends IService<ITask> {

}

export class LocalStorageTaskService implements ITaskService {
  private readonly taskRepository: LocalStorageRepository<TaskResource>;
  private readonly projectRepository: LocalStorageRepository<ProjectResource>;

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

  private getTask(taskItem: TaskResource) : ITask {
    let project: IProject | undefined;
    if (taskItem.projectHref) {
      const projectId = api.resolveId(taskItem.projectHref);
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
