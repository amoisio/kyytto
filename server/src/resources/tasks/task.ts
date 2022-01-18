import { Identifier, Identifiable, IdentifierType, TaskResource, TaskState } from 'kyytto-models';
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
   * @param title Title of the task.
   * @param description Description of the task.
   * @param projectId Id of the project which this task belongs to.
   * @returns A newly created task with a generated id and in Todo state.
   */
  public async new(title: string, description: string | undefined, projectId: IdentifierType): Promise<Task> {
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
    return new Task(id, title, description, state, project, [ project.toTag() ]);
  }

  /**
   * Create a Project entity from the given resource representation.
   * @param resource Project resource.
   * @returns A project entity corresponding the resource representation.
   */
  public async from(resource: TaskResource): Promise<Task> {
    const href = resource.href;
    if (isEmpty(href)) {
      throw new Error('Task reference is invalid.');
    }

    const id = api.resolveId(resource.href);
    if (id === undefined) {
      throw new Error('Unable to resolve resource id.');
    }

    if (!Identifier.isValid(id) || Identifier.isNil(id)) {
      throw new Error('Task reference is invalid.');
    }

    const title = resource.title;
    if (isEmpty(title)) {
      throw new Error('Title must be provided.');
    }

    const state = resource.state;
    if (state === null || state === undefined || state < 0 || state > TaskState.Completed) {
      throw new Error(`State is invalid. Value: ${state}`);
    }

    const projectHref = resource.projectHref;
    if (isEmpty(projectHref)) {
      throw new Error('Project reference is invalid.');
    }

    const projectId = api.resolveId(projectHref);
    if (projectId === undefined || !Identifier.isValid(projectId) || Identifier.isNil(projectId)) {
      throw new Error('Project reference is invalid.');
    }

    const project = await this.unitOfWork.projectRepository.getById(projectId);
    if (!project) {
      throw new Error('Project reference is invalid.');
    }

    const tags = resource.tags
      .map(tag => ({ id: api.resolveId(tag.href), name: tag.name, type: tag.type }))
      .filter(tag => tag.id !== undefined)
      .map(tag => new Tag(tag.id!, tag.name, tag.type));

    return new Task(
      id,
      title,
      resource.description,
      state,
      project,
      tags);
  }
}

export class Task implements Identifiable {
  public readonly id: IdentifierType;
  public title: string;
  public description: string | undefined;
  public state: TaskState;
  public project: Project;
  public tags: Tag[];

  public constructor(id: IdentifierType, title: string, description: string | undefined, state: TaskState, project: Project, tags: Tag[] = []) {
    if (id === undefined || Identifier.isNil(id) || !Identifier.isValid(id)) {
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
  }

  public toResource(): TaskResource {
    return {
      href: api.tasks.resolveHref(this.id),
      title: this.title,
      description: this.description,
      state: this.state,
      projectHref: api.projects.resolveHref(this.project.id),
      tags: this.tags.map(tag => tag.toResource())
    };
  }
}
