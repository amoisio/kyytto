import { IProjectResource } from './projects/project-models';
import { LocalStorageRepository } from './local-storage-repository';
import { ITaskResource } from './board/task-models';
import * as api from '@/api';

export class LocalStorage {
  public readonly projectRepository: LocalStorageRepository<IProjectResource>;
  public readonly taskRepository: LocalStorageRepository<ITaskResource>;

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
