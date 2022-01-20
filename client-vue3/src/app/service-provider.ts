import { TaskService, ApiTaskService } from './board/task-service';
import { ProjectService, ApiProjectService } from './projects/project-service';
import { client } from './api';
import { NotificationService } from '../shared/notification-service';
import { ApiTagService, TagService } from './tags/tag-service';

export interface ServiceProvider {
  projectService: ProjectService;
  taskService: TaskService;
  notificationService: NotificationService;
  tagService: TagService;
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
  public readonly tagService: TagService;

  constructor() {
    this.projectService = new ApiProjectService(client);
    this.tagService = new ApiTagService(client);
    this.taskService = new ApiTaskService(client, this.projectService, this.tagService);
    this.notificationService = new NotificationService();
  }
}

export const provider: ServiceProvider = new KyyttoServiceProvider();
