import { IProject } from '@/projects/project-models';
import { IResource, ResourceReference } from '../iresource';
import { TaskState } from './task-state';

export interface ITask extends IResource {
  title: string;
  description: string | undefined;
  state: TaskState;
  projectHref: ResourceReference;
}

export interface ITasks extends IResource {
  tasks: ITask[];
}

export class TaskEditFormModel {
  public title: string | undefined = undefined;
  public description: string | undefined = undefined;
  public project: IProject | undefined = undefined;
  public state: TaskState = TaskState.Todo;
}
