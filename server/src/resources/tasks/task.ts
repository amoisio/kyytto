import { Identifier, TaskResource, TaskState } from 'kyytto-models';
import { NIL, validate } from 'uuid';
import UnitOfWork from '../../storage/unit-of-work.js';
import { Project } from '../projects/project.js';
import { api } from '../api.js';
import Identifiable from '../identifiable.js';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';

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
  public async new(title: string, description: string | undefined, projectId: Identifier): Promise<Task> {
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
    return new Task(id, title, description, state, project);
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
    if (!validate(id.value) || id.value === NIL) {
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
    if (!validate(projectId.value) || projectId.value === NIL) {
      throw new Error('Project reference is invalid.');
    }

    const project = await this.unitOfWork.projectRepository.getById(projectId);
    if (!project) {
      throw new Error('Project reference is invalid.');
    }

    return new Task(
      id,
      title,
      resource.description,
      state,
      project);
  }
}

export class Task implements Identifiable {
  public readonly id: Identifier;
  public title: string;
  public description: string | undefined;
  public state: TaskState;
  public project: Project;

  public constructor(id: Identifier, title: string, description: string | undefined, state: TaskState, project: Project) {
    if (!id || id.value === NIL || !validate(id.value)) {
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
  }

  public toResource(): TaskResource {
    return {
      href: api.tasks.resolveHref(this.id),
      title: this.title,
      description: this.description,
      state: this.state,
      projectHref: api.projects.resolveHref(this.project.id)
    };
  }
}
