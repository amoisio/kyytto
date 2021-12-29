import { ITaskService, LocalStorageTaskService } from './board/task-service';
import { LocalStorage } from '../shared/local-storage';
import { IProjectService, LocalStorageProjectService } from './projects/project-service';

export interface ServiceProvider {
  projectService: IProjectService;
  taskService: ITaskService;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: ServiceProvider;
  }
}

export class KyyttoServiceProvider implements ServiceProvider {
  public readonly projectService: IProjectService;
  public readonly taskService: ITaskService;

  constructor() {
    const store = new LocalStorage();
    this.projectService = new LocalStorageProjectService(store);
    this.taskService = new LocalStorageTaskService(store);
  }
}

export const provider: ServiceProvider = new KyyttoServiceProvider();
