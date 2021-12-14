import { parse } from '@/lib/hrefParser';
import { IEntity, IResource } from '../iresource';

export interface IProjectResource extends IResource {
  name: string;
  description?: string;
  color: string;
}

export interface IProject extends IEntity {
  name: string;
  description?: string;
  color: string;
}

export class Project implements IProject {
  public constructor(id: string, name: string, description: string | undefined, color: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
  }

  public static createFrom(resource: IProjectResource): IProject {
    return new Project(
      parse(resource.href).id,
      resource.name,
      resource.description,
      resource.color);
  }

  public readonly id: string;
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
