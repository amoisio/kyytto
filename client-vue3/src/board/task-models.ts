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

export interface ITaskEditFormModel {
  title: string | undefined;
  description: string | undefined;
  project: IProject | undefined;
  state: TaskState;
}