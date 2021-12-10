import { IProject } from '@/projects/project';
import { IResource } from '../iresource';
import { TaskState } from './task-state';

export interface ITask extends IResource {
  title: string;
  description: string | undefined;
  state: TaskState;
  project: IProject;
}

export interface ITasks extends IResource {
  tasks: ITask[];
}

export interface INewTask {
  title: string;
  description: string;
  project: IProject;
}
