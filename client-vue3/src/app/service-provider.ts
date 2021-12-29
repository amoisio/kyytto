import { ITaskService, LocalStorageTaskService } from './board/task-service';
import { LocalStorage } from '../shared/local-storage';
import { IMenuService, LocalMenuService, MenuService } from './menu/menu-service';
import { IProjectService, LocalStorageProjectService } from './projects/project-service';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: ServiceProvider;
  }
}

export interface ServiceProvider {
  menuService: IMenuService;
  projectService: IProjectService;
  taskService: ITaskService;
}

export class KyyttoServiceProvider implements ServiceProvider {
  public readonly menuService: IMenuService;
  public readonly projectService: IProjectService;
  public readonly taskService: ITaskService;

  constructor() {
    this.menuService = new LocalMenuService();
    const store = new LocalStorage();
    this.projectService = new LocalStorageProjectService(store);
    this.taskService = new LocalStorageTaskService(store);
  }
}

export const provider: ServiceProvider = new KyyttoServiceProvider();