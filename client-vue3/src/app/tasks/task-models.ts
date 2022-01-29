import { Project } from '@/app/projects/project-models';
import { Entity } from '@/shared/entity';
import { Identifier, IdentifierType, MatchType, ProjectResource, TagResource, TaskDto, TaskResource, Utilities } from 'kyytto-models';
import { Stack } from '../stacks/stack-models';
import { Tag, TagCollection } from '../tags/tag-models';
import { TaskState } from './task-state';

export class TaskCollection extends Array<Task> {
  constructor(resources: [task: TaskResource, project: ProjectResource, tags: TagResource[]][])
  constructor(capacity: number)
  constructor()
  constructor(val?: number | [task: TaskResource, project: ProjectResource, tags: TagResource[]][]) {
    if (val === undefined) {
      super();
    } else if (typeof val === "number") {
      super(val);
    } else {
      const tasks = val.map(r => new Task(r[0], r[1], r[2]));
      super(...tasks);
    }
  }

  public filterByStack(stack: Stack): TaskCollection {
    const arr = new TaskCollection();
    const stackTasks = this.filter(task => stack.isStackTask(task));
    arr.push(...stackTasks);
    return arr;
  }
}

export class Task extends Entity<TaskDto> {
  public title: string;
  public description: string;
  public state: TaskState;
  public project: Project;
  public tags: Tag[];
  public isBug: boolean;

  constructor(id: IdentifierType, project: Project, tags: Tag[], title: string, description: string, state: TaskState, isBug: boolean);
  constructor(task: TaskResource, project: ProjectResource, tags: TagResource[]);
  constructor();
  constructor(item?: IdentifierType | TaskResource, project ?: Project | ProjectResource, tags ?: Tag[] | TagResource[], title ?: string, description ?: string, state ?: TaskState, isBug ?: boolean) {
    if (item === undefined) {
      super(Identifier.nil);
      this.title = '';
      this.description = '';
      this.state = TaskState.Todo;
      this.project = new Project();
      this.tags = [];
      this.isBug = false;
    } else if (typeof item === 'string') {
      super(item);
      this.title = title!
      this.description = description!;
      this.state = state!;
      this.project = project as Project;
      this.tags = tags as Tag[];
      this.isBug = isBug!;
    } else {
      super(Utilities.resolveId(item.href));
      this.title = item.title;
      this.description = item.description ?? '';
      this.state = item.state;
      this.project = new Project(project as ProjectResource);
      this.tags = new TagCollection(tags as TagResource[]);
      this.isBug = item.isBug;
    }
  }

  public copy(): Task {
    const project = this.project.copy()
    const tags = this.tags.map(tag => tag.copy());
    return new Task(this.id, project, tags, this.title, this.description, this.state, this.isBug);
  }

  public toDto(): TaskDto {
    return {
      title: this.title,
      description: this.description,
      state: this.state,
      projectId: this.project.id,
      tagIds: this.tags.map(tag => tag.id),
      isBug: this.isBug
    }
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!Identifier.isValidOrNil(this.id)) {
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

  public isNew(): boolean {
    return Identifier.isNil(this.id);
  }

  public isTodo(): boolean {
    return this.state === TaskState.Todo;
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
