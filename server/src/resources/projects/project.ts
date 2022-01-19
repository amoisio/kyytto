import { api } from '../api.js';
import { Color, ColorType, Identifiable, Identifier, IdentifierType, ProjectDto, ProjectResource, TagType } from 'kyytto-models';
import { ColorGenerator } from '../../utilities/color-generator.js';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';
import { Tag } from '../../resources/tags/tag.js';

export class ProjectBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator,
    private readonly colorGenerator: ColorGenerator) { }

  /**
   * Creates a new Project.
   * @param dto project data.
   * @returns A newly created project with generated id and color.
   */
  public async new(dto: ProjectDto): Promise<Project> {
    if (isEmpty(dto.name)) {
      throw new Error('Name must be provided.');
    }

    const id = this.idGenerator.generate();
    const color = await this.colorGenerator.generate();
    return new Project(id, dto.name, dto.description, color);
  }

  /**
   * Create a Project entity from the given resource representation.
   * @param id project identifier.
   * @param dto project data.
   * @returns A project entity corresponding the resource representation.
   */
  public async from(id: IdentifierType, dto: ProjectDto): Promise<Project> {
    if (!Identifier.isValid(id)) {
      throw new Error(`Id value ${id} is invalid.`);
    }

    return new Project(id, dto.name, dto.description, dto.color);
  }
}

export class Project implements Identifiable {
  public readonly id: IdentifierType;
  public name: string;
  public description: string | undefined;
  public color: ColorType;

  public constructor(id: IdentifierType, name: string, description: string | undefined, color: ColorType) {
    if (!Identifier.isValid(id)) {
      throw new Error(`Given id: ${id} is invalid.`);
    }
    this.id = id;
    
    if (isEmpty(name)) {
      throw new Error('Name must not be empty.');
    }
    this.name = name;
    this.description = description;

    if (!Color.isValid(color)) {
      throw new Error(`Value ${color} is not a valid color value.`);
    }
    this.color = color;
  }

  public toTag(): Tag {
    return new Tag(this.id, this.name, TagType.Project);
  }

  public toResource(): ProjectResource {
    return {
      href: api.projects.resolveHref(this.id),
      name: this.name,
      description: this.description,
      color: this.color
    };
  }
}
