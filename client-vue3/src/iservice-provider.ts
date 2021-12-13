import { ITaskService } from './board/itask-service';
import { IProjectService } from './projects/iproject-service';

export interface IServiceProvider {
  projectService: IProjectService;
  taskService: ITaskService;
}

export const provider = {} as IServiceProvider;

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: IServiceProvider;
  }
}
