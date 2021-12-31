import Identifiable from '../identifiable.js';
import { NIL, validate } from 'uuid';
import { api } from '../api.js';
import { Color, colorBuilder, Identifier, ProjectResource } from 'kyytto-models';
import { ColorGenerator } from '../../utilities/color-generator.js';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';

export class ProjectBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator,
    private readonly colorGenerator: ColorGenerator) { }

  /**
   * Creates a new Project.
   * @param name Name of the project.
   * @param description Desciption of the project.
   * @returns A newly created project with generated id and color.
   */
  public async new(name: string, description: string | undefined): Promise<Project> {
    if (name === null || name === undefined || name.length === 0) {
      throw new Error('Name must be provided.');
    }

    const id = this.idGenerator.generate();
    const color = await this.colorGenerator.generate();
    return new Project(id, name, description, color);
  }

  /**
   * Create a Project entity from the given resource representation.
   * @param resource Project resource.
   * @returns A project entity corresponding the resource representation.
   */
  public async from(resource: ProjectResource): Promise<Project> {
    const id = api.resolveId(resource.href);
    return new Project(
      id,
      resource.name,
      resource.description,
      colorBuilder(resource.color));
  }
}

export class Project implements Identifiable {
  public readonly id: Identifier;
  public name: string;
  public description: string | undefined;
  public color: Color;

  public constructor(id: Identifier, name: string, description: string | undefined, color: Color) {
    if (!id || id.value === NIL || !validate(id.value)) {
      throw new Error(`Given id: ${id} is invalid.`);
    }
    this.id = id;
    
    if (name === null || name === undefined || name.length === 0) {
      throw new Error('Name must not be empty.');
    }
    this.name = name;
    this.description = description;

    if (!color.validate()) {
      throw new Error(`Given color: ${color} is invalid.`);
    }
    this.color = color;
  }

  public toResource(): ProjectResource {
    return {
      href: api.projects.resolveHref(this.id),
      name: this.name,
      description: this.description,
      color: this.color.value
    };
  }
}
