import { TaskResource, TaskState } from "kyytto-models";
import { v4 as uuidv4, NIL } from "uuid";
import UnitOfWork from "../../lib/unitOfWork";
import { Project } from "../projects/project";
import { api } from '../../api';

export class Task {
  public id: string;
  public title: string;
  public description: string | undefined;
  public state: TaskState;
  public project: Project;

  public constructor(id: string, title: string, description: string | undefined, state: TaskState, project: Project) {
    if (id === NIL) {
      id = uuidv4();
    }
    this.id = id;
    this.title = title;
    this.description = description;
    this.state = state;
    this.project = project;
  }
    
  public static async createFrom(resource: TaskResource, uow: UnitOfWork): Promise<Task> {
    if (resource.projectHref === undefined) {
      throw new Error('Project reference must be given.');
    }

    const projectId = api.resolveId(resource.projectHref);
    const project = await uow.projectRepository.get(projectId);
    return new Task(
      api.resolveId(resource.href), 
      resource.title, 
      resource.description, 
      resource.state,
      project);
  }

  public toResource(): TaskResource {
    return {
      href: api.tasks.resolveHref(this.id),
      title: this.title,
      description: this.description,
      state: this.state,
      projectHref: api.projects.resolveHref(this.project.id),
    };
  }
}
