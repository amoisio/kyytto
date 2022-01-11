import { TaskService, LocalStorageTaskService, ApiTaskService } from './board/task-service';
import { LocalStorage } from '../shared/local-storage';
import { ProjectService, LocalStorageProjectService, ApiProjectService } from './projects/project-service';
import { client } from './api';
import { NotificationService } from '../shared/notification-service';

export interface ServiceProvider {
  projectService: ProjectService;
  taskService: TaskService;
  notificationService: NotificationService;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: ServiceProvider;
  }
}

export class KyyttoServiceProvider implements ServiceProvider {
  public readonly projectService: ProjectService;
  public readonly taskService: TaskService;
  public readonly notificationService: NotificationService;

  // constructor() {
  //   const store = new LocalStorage();
  //   this.projectService = new LocalStorageProjectService(store);
  //   this.taskService = new LocalStorageTaskService(store);
  // }

  constructor() {
    const store = new LocalStorage();
    this.projectService = new ApiProjectService(client);
    this.taskService = new ApiTaskService(client);
    this.notificationService = new NotificationService();
  }
}

export const provider: ServiceProvider = new KyyttoServiceProvider();
