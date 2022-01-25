import { TaskService, ApiTaskService } from './board/task-service';
import { ProjectService, ApiProjectService } from './projects/project-service';
import { client } from './api';
import { NotificationService } from '../shared/notification-service';
import { ApiTagService, TagService } from './tags/tag-service';
import { ApiStackService } from './stacks/stack-service';
import { Service } from './api-service';
import { Stack } from './stacks/stack-models';
import { StackDto } from 'kyytto-models';

export interface ServiceProvider {
  notificationService: NotificationService;
  projectService: ProjectService;
  taskService: TaskService;
  tagService: TagService;
  stackService: Service<Stack, StackDto>;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: ServiceProvider;
  }
}

export class KyyttoServiceProvider implements ServiceProvider {
  public readonly notificationService: NotificationService;
  public readonly projectService: ProjectService;
  public readonly taskService: TaskService;
  public readonly tagService: TagService;
  public readonly stackService: Service<Stack, StackDto>

  constructor() {
    this.notificationService = new NotificationService();
    this.projectService = new ApiProjectService(client);
    this.tagService = new ApiTagService(client);
    this.taskService = new ApiTaskService(client, this.projectService, this.tagService);
    this.stackService  = new ApiStackService(client);
  }
}

export const provider: ServiceProvider = new KyyttoServiceProvider();
