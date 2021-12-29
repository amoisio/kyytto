import { LocalStorageRepository } from './local-storage-repository';
import { api } from '../app/api';
import { ProjectResource, TaskResource } from 'kyytto-models';

export class LocalStorage {
  public readonly projectRepository: LocalStorageRepository<ProjectResource>;
  public readonly taskRepository: LocalStorageRepository<TaskResource>;

  constructor() {
    const projectUrl = api.projects.resolveHref();
    if (projectUrl === undefined) {
      throw new Error('API endpoint map is ill-formed.');
    }
    this.projectRepository = new LocalStorageRepository('projects', projectUrl);

    const tasksUrl = api.tasks.resolveHref();
    if (tasksUrl === undefined) {
      throw new Error('API endpoint map is ill-formed.');
    }
    this.taskRepository = new LocalStorageRepository('tasks', tasksUrl);
  }
}
