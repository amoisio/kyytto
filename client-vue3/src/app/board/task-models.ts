import { Project } from '@/app/projects/project-models';
import { Identifiable } from '@/shared/identifiable';
import { isEmpty, NEWID } from '@/shared/utilities';
import { Validatable } from '@/shared/validatable';
import { idBuilder, Identifier, ProjectResource, TaskResource } from 'kyytto-models';
import { api } from '../api';
import { Tag } from '../tags/tag-models';
import { TaskState } from './task-state';

export class Task implements Identifiable, Validatable {
  public readonly id: Identifier;
  public title: string;
  public description?: string;
  public state: TaskState;
  public project: Project;
  public tags: Tag[];

  public constructor(id: Identifier, title: string, description: string | undefined, state: TaskState, project: Project, tags: Tag[] = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.state = state;
    this.project = project;
    this.tags = tags;
  }
  
  /**
   * Creates an empty Task.
   */
  public static empty(): Task {
    return new Task(
      idBuilder(NEWID), 
      '', 
      undefined, 
      TaskState.Todo,
      Project.empty());
  }

  /**
   * Create a Task entity from the given resource representation.
   * @param taskResource Task resource.
   * @param projectResource Project resource.
   * @returns A Task entity corresponding the resource representation.
   */
  public static from(taskResource: TaskResource, projectResource: ProjectResource): Task {
    return new Task(
      api.resolveId(taskResource.href),
      taskResource.title,
      taskResource.description,
      taskResource.state,
      Project.from(projectResource),
      taskResource.tags.map(tag => Tag.from(tag)));
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!this.id.validate()) {
      errors.push(`Id ${this.id.value} is invalid.`);
    }

    if (isEmpty(this.title)) {
      errors.push('Title must not be empty.');
    }

    if (this.state === undefined || this.state < TaskState.Todo || this.state > TaskState.Completed) {
      errors.push(`State ${this.state} is invalid.`)
    }

    if (this.project === undefined || this.project.id.isNil()) {
      errors.push('Project reference is invalid.');
    }

    return errors;
  }

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

  public addTag(tag: Tag): void {
    this.tags.push(tag);
  }

  public removeTag(tag: Tag): void {
    const index = this.tags.findIndex(tag => tag.id.value === tag.id.value);
    this.tags.splice(index, 1);
  }
}
