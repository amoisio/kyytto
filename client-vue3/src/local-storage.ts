import { LocalStorageRepository } from './local-storage-repository';
import * as api from '@/api';
import { ProjectResource, TaskResource } from 'kyytto-models';

export class LocalStorage {
  public readonly projectRepository: LocalStorageRepository<ProjectResource>;
  public readonly taskRepository: LocalStorageRepository<TaskResource>;

  constructor() {
    const projectUrl = api.endPoints.get(api.projectsKey);
    if (projectUrl === undefined) {
      throw new Error('API endpoint map is ill-formed.');
    }
    this.projectRepository = new LocalStorageRepository('projects', projectUrl);

    const tasksUrl = api.endPoints.get(api.tasksKey);
    if (tasksUrl === undefined) {
      throw new Error('API endpoint map is ill-formed.');
    }
    this.taskRepository = new LocalStorageRepository('tasks', tasksUrl);
  }
}
