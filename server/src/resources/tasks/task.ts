import { Identifier, Identifiable, IdentifierType, TaskResource, TaskState, TaskDto } from 'kyytto-models';
import UnitOfWork from '../../storage/unit-of-work.js';
import { Project } from '../projects/project.js';
import { api } from '../api.js';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';
import { Tag } from '../../resources/tags/tag.js';

export class TaskBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator,
    private readonly unitOfWork: UnitOfWork) { }

  /**
   * Create a new Task.
   * @param dto task data.
   * @returns A newly created Todo task with a generated id.
   */
  public async new(dto: TaskDto): Promise<Task> {
    const title = dto.title;
    const description = dto.description;
    const projectId = dto.projectId;
    if (isEmpty(title)) {
      throw new Error('Title must be provided.');
    }
    if (!projectId) {
      throw new Error('Project id must be provided.');
    }
    const project = await this.unitOfWork.projectRepository.getById(projectId);
    if (!project) {
      throw new Error('Project reference is invalid.');
    }

    const id = this.idGenerator.generate();
    const state = TaskState.Todo;
    return new Task(id, title, description, state, project, [ project.toTag() ], dto.isBug);
  }

  /**
   * Create a Task entity.
   * @param id task identifier.
   * @param dto task data.
   * @returns A task entity.
   */
  public async from(id: IdentifierType, dto: TaskDto): Promise<Task> {
    if (!Identifier.isValid(id)) {
      throw new Error(`Task id ${id} is invalid.`);
    }
    const title = dto.title;
    if (isEmpty(title)) {
      throw new Error('Title must be provided.');
    }

    const state = dto.state;
    if (state === null || state === undefined || state < 0 || state > TaskState.Completed) {
      throw new Error(`State is invalid. Value: ${state}`);
    }

    const projectId = dto.projectId;
    if (!Identifier.isValid(projectId)) {
      throw new Error(`Project id ${projectId} is invalid.`);
    }

    const project = await this.unitOfWork.projectRepository.findById(projectId);
    if (!project) {
      throw new Error(`Project id ${projectId} is invalid.`);
    }

    const projectTag = project.toTag();
    const tags: Tag[] = [];
    for(const tagId of dto.tagIds) {
      const tag = (tagId !== projectTag.id)
      ? await this.unitOfWork.tagRepository.findById(tagId)
      : projectTag;

      if (!tag) {
        throw new Error(`Tag id ${tagId} is invalid.`);
      }
      tags.push(tag);
    }

    return new Task(id, title, dto.description, state, project, tags, dto.isBug);
  }
}

export class Task implements Identifiable {
  public readonly id: IdentifierType;
  public title: string;
  public description: string | undefined;
  public state: TaskState;
  public readonly project: Project;
  public readonly tags: Tag[];
  public readonly isBug: boolean;

  public constructor(id: IdentifierType, title: string, description: string | undefined, state: TaskState, project: Project, tags: Tag[] = [], isBug: boolean = false) {
    if (!Identifier.isValid(id)) {
      throw new Error(`Id is invalid. Value: ${id}.`);
    }
    this.id = id;

    if (isEmpty(title)) {
      throw new Error('Title must be provided.');
    }
    this.title = title;
    this.description = description;

    if (state === null || state === undefined || state < 0 || state > TaskState.Completed) {
      throw new Error(`State is invalid. Value: ${state}`);
    }
    this.state = state;

    if (!project) {
      throw new Error('Project must be provided.');
    }
    this.project = project;
    this.tags = tags;
    this.isBug = isBug;
  }

  public toResource(): TaskResource {
    return {
      href: api.tasks.resolveHref(this.id),
      title: this.title,
      description: this.description,
      state: this.state,
      projectHref: api.projects.resolveHref(this.project.id),
      tagHrefs: this.tags.map(tag => api.tags.resolveHref(tag.id)),
      isBug: this.isBug
    };
  }
}
