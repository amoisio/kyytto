import { parse } from '@/lib/hrefParser';
import { IProject } from '@/projects/project-models';
import { IEntity, IResource, ResourceReference } from '../iresource';
import { TaskState } from './task-state';

export interface ITaskResource extends IResource {
  title: string;
  description ?: string;
  state: TaskState;
  projectHref?: ResourceReference;
}

export interface ITask extends IEntity {
  title: string;
  description ?: string;
  project ?: IProject;
  state: TaskState;
  isStarted(): boolean;
  isCompleted(): boolean;
  startWork(): void;
  stopWork(): void;
  complete(): void;
}

export class Task implements ITask {
  public constructor(id: string, title: string, description: string | undefined, state: TaskState, project: IProject | undefined) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.state = state;
    this.project = project;
  }

  public static createFrom(resource: ITaskResource, project?: IProject): ITask {
    return new Task(
      parse(resource.href).id,
      resource.title,
      resource.description,
      resource.state,
      project);
  }

  public readonly id: string;
  public title: string;
  public description: string | undefined;
  public state: TaskState;
  public project: IProject | undefined;

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
  public id ?: string
  public title ?: string;
  public description ?: string;
  public project ?: IProject;
  public state ?: TaskState;
  public get color(): string | undefined {
    return this.project?.color;
  }
}
