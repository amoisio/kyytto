import { LocalStorageRepository } from './local-storage-repository';
import { api, ProjectResource, TaskResource } from 'k-models';

export class LocalStorage {
  public readonly projectRepository: LocalStorageRepository<ProjectResource>;
  public readonly taskRepository: LocalStorageRepository<TaskResource>;

  constructor(baseUrl: string) {
    const projectUrl = api.projects.resolve(baseUrl);
    if (projectUrl === undefined) {
      throw new Error('API endpoint map is ill-formed.');
    }
    this.projectRepository = new LocalStorageRepository('projects', projectUrl);

    const tasksUrl = api.tasks.resolve(baseUrl);
    if (tasksUrl === undefined) {
      throw new Error('API endpoint map is ill-formed.');
    }
    this.taskRepository = new LocalStorageRepository('tasks', tasksUrl);
  }
}
