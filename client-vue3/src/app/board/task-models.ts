import { Project } from '@/app/projects/project-models';
import { Entity } from '@/shared/entity';
import { Identifier, IdentifierType, ProjectResource, TagResource, TaskDto, TaskResource, Utilities } from 'kyytto-models';
import { Tag, TagCollection } from '../tags/tag-models';
import { TaskState } from './task-state';

export class TaskCollection extends Array<Task> {
  constructor(resources: [task: TaskResource, project: ProjectResource, tags: TagResource[]][]) {
    super(...resources.map(r => new Task(r[0], r[1], r[2])));
  }
}

export class Task extends Entity {
  public title: string;
  public description: string;
  public state: TaskState;
  public project: Project;
  public tags: Tag[];

  constructor(id: IdentifierType, project: Project, tags: Tag[], title: string, description: string, state: TaskState);
  constructor(task: TaskResource, project: ProjectResource, tags: TagResource[]);
  constructor();
  constructor(item?: IdentifierType | TaskResource, project ?: Project | ProjectResource, tags ?: Tag[] | TagResource[], title ?: string, description ?: string, state ?: TaskState) {
    if (item === undefined) {
      super(Identifier.nil);
      this.title = '';
      this.description = '';
      this.state = TaskState.Todo;
      this.project = new Project();
      this.tags = [];
    } else if (typeof item === 'string') {
      super(item);
      this.title = title!
      this.description = description!;
      this.state = state!;
      this.project = project as Project;
      this.tags = tags as Tag[];
    } else {
      super(Utilities.resolveId(item.href));
      this.title = item.title;
      this.description = item.description ?? '';
      this.state = item.state;
      this.project = new Project(project as ProjectResource);
      this.tags = new TagCollection(tags as TagResource[]);
    }
  }

  public copy(): Task {
    const project = this.project.copy()
    const tags = this.tags.map(tag => tag.copy());
    return new Task(this.id, project, tags, this.title, this.description, this.state);
  }

  public toDto(): TaskDto {
    return {
      title: this.title,
      description: this.description,
      state: this.state,
      projectId: this.project.id,
      tagIds: this.tags.map(tag => tag.id)
    }
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!Identifier.isValid(this.id)) {
      errors.push(`Id ${this.id} is invalid.`);
    }

    if (Utilities.isEmpty(this.title)) {
      errors.push('Title must not be empty.');
    }

    if (this.state === undefined || this.state < TaskState.Todo || this.state > TaskState.Completed) {
      errors.push(`State ${this.state} is invalid.`)
    }

    if (!Identifier.isValid(this.project.id)) {
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
    const index = this.tags.findIndex(t => t.id === tag.id);
    this.tags.splice(index, 1);
  }
}
