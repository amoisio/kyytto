import Identifiable from 'identifiable.js';
import { ProjectResource } from 'kyytto-models';
import { NIL, v4 as uuidv4 } from 'uuid';
import { api } from 'api.js';

export class Project implements Identifiable {
  public id: string;
  public name: string;
  public description: string | undefined;
  public color: string;

  public constructor(id: string, name: string, description: string | undefined, color: string) {
    if (id === NIL) {
      id = uuidv4();
    }
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
  }

  public static createFrom(resource: ProjectResource): Project {
    return new Project(
      api.resolveId(resource.href), 
      resource.name, 
      resource.description, 
      resource.color);
  }

  public toResource(): ProjectResource {
    return {
      href: api.projects.resolveHref(this.id),
      name: this.name,
      description: this.description,
      color: this.color,
    };
  }
}
