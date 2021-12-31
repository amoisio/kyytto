import { Identifier, ProjectResource } from 'kyytto-models';
import { api } from '../api';

export interface IProject {
  id: Identifier,
  name: string;
  description?: string;
  color: string;
}

export class Project implements IProject {
  public constructor(id: Identifier, name: string, description: string | undefined, color: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
  }

  public static createFrom(resource: ProjectResource): IProject {
    return new Project(
      api.resolveId(resource.href),
      resource.name,
      resource.description,
      resource.color);
  }

  public readonly id: Identifier;
  public name: string;
  public description?: string;
  public color: string;
}

export class ProjectEditFormModel {
  public id ?: string;
  public name ?: string;
  public description ?: string;
  public color ?: string;
}
