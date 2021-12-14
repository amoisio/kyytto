import { ITask } from './board/task-models';
import { IService } from './iservice';
import { IProject } from './projects/project-models';

export interface IServiceProvider {
  projectService: IService<IProject>;
  taskService: IService<ITask>;
}

export const provider = {} as IServiceProvider;

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: IServiceProvider;
  }
}
