import { Identifiable } from '@/shared/identifiable';
import { isEmpty, NEWID } from '@/shared/utilities';
import { Validatable } from '@/shared/validatable';
import { idBuilder, Identifier, TagResource, TagType } from 'kyytto-models';
import { api } from '../api';

export class Tag implements Identifiable, Validatable {
  public readonly id: Identifier;
  public name: string;
  public type: TagType;

  public constructor(id: Identifier, name: string, type: TagType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
  
  /**
   * Creates a new Tag.
   */
  public static new(name: string): Tag {
    return new Tag(
      idBuilder(NEWID), 
      name, 
      TagType.UserDefined);
  }

  /**
   * Create a Tag entity from the given resource representation.
   * @param tagResource Tag resource.
   * @returns A Tag entity corresponding the resource representation.
   */
  public static from(tagResource: TagResource): Tag {
    return new Tag(
      api.resolveId(tagResource.href),
      tagResource.name,
      tagResource.type);
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!this.id.validate()) {
      errors.push(`Id ${this.id.value} is invalid.`);
    }

    if (isEmpty(this.name)) {
      errors.push('Name must not be empty.');
    }

    if (this.type !== TagType.UserDefined && this.type !== TagType.Project) {
      errors.push(`Type ${this.type} is invalid.`)
    }

    return errors;
  }
}
