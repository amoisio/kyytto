import { Identifiable } from '@/shared/identifiable';
import { isEmpty, NEWID } from '@/shared/utilities';
import { Validatable } from '@/shared/validatable';
import { Color, colorBuilder, idBuilder, Identifier, ProjectResource } from 'kyytto-models';
import { api } from '../api';

export class Project implements Identifiable, Validatable {
  public readonly id: Identifier;
  public name: string;
  public description?: string;
  public color: Color;
  
  public constructor(id: Identifier, name: string, description: string | undefined, color: Color) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
  }

  /**
   * Creates an empty Project.
   */
  public static empty(): Project {
    const color = colorBuilder('ffffff');
    return new Project(idBuilder(NEWID), '', undefined, color);
  }

  /**
   * Create a Project entity from the given resource representation.
   * @param resource Project resource.
   * @returns A project entity corresponding the resource representation.
   */
  public static from(resource: ProjectResource): Project {
    return new Project(
      api.resolveId(resource.href),
      resource.name,
      resource.description,
      colorBuilder(resource.color));
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!this.id.validate()) {
      errors.push(`Id ${this.id.value} is invalid.`)
    }

    if (isEmpty(this.name)) {
      errors.push('Name must not be empty.');
    }

    if (!this.color.validate()) {
      errors.push(`Color ${this.color.value} is invalid.`);
    }

    return errors;
  }
}
