import { IProject } from '@/app/projects/project-models';
import { isNew } from '@/shared/utilities';
import { Identifier, TaskResource } from 'kyytto-models';
import { api } from '../api';
import { TaskState } from './task-state';

export interface ITask {
  id: Identifier,
  title: string;
  description ?: string;
  project: IProject;
  state: TaskState;
  isStarted(): boolean;
  isCompleted(): boolean;
  startWork(): void;
  stopWork(): void;
  complete(): void;
}

export class Task implements ITask {
  public constructor(id: Identifier, title: string, description: string | undefined, state: TaskState, project: IProject) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.state = state;
    this.project = project;
  }

  public static createFrom(resource: TaskResource, project: IProject): ITask {
    return new Task(
      api.resolveId(resource.href),
      resource.title,
      resource.description,
      resource.state,
      project);
  }

  public readonly id: Identifier;
  public title: string;
  public description: string | undefined;
  public state: TaskState;
  public project: IProject;

  public isStarted(): boolean {
    return this.state === TaskState.InProgress;
  }

  public isCompleted(): boolean {
    return this.state === TaskState.Completed;
  }

  public startWork(): void {
    if (this.isCompleted()) {
      throw new Error('Cannot start a completed task.');
    }
    this.state = TaskState.InProgress;
  }

  public stopWork(): void {
    if (this.isCompleted()) {
      throw new Error('Cannot stop a completed task.');
    }
    this.state = TaskState.Todo;
  }

  public complete(): void {
    if (!this.isCompleted && !this.isStarted) {
      throw new Error('Cannot complete a todo task.');
    }
    this.state = TaskState.Completed;
  }
}

export class TaskEditFormModel {
  constructor (id: string) {
    this.id = id;
  }

  public id: string
  public title: string = '';
  public description ?: string;
  public project ?: IProject;
  public state: TaskState = TaskState.Todo;
  
  public get color(): string | undefined {
    return this.project?.color;
  }

  public get isNew(): boolean {
    return isNew(this.id);
  }
}
