import { TaskService, LocalStorageTaskService } from './board/task-service';
import { LocalStorage } from '../shared/local-storage';
import { ProjectService, LocalStorageProjectService } from './projects/project-service';

export interface ServiceProvider {
  projectService: ProjectService;
  taskService: TaskService;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: ServiceProvider;
  }
}

export class KyyttoServiceProvider implements ServiceProvider {
  public readonly projectService: ProjectService;
  public readonly taskService: TaskService;

  constructor() {
    const store = new LocalStorage();
    this.projectService = new LocalStorageProjectService(store);
    this.taskService = new LocalStorageTaskService(store);
  }
}

export const provider: ServiceProvider = new KyyttoServiceProvider();
