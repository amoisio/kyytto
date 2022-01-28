import { api } from '../api.js';
import { Identifiable, Identifier, IdentifierType, TagDto, TagResource, TagType } from 'kyytto-models';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';
import text from '../../utilities/text-utilities.js';

export class TagBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator) { }

  /**
   * Creates a new user-defined tag.
   * @param dto tag data.
   * @returns A newly created tag with generated id.
   */
  public async new(dto: TagDto): Promise<Tag> {
    if (isEmpty(dto.name)) {
      throw new Error('Name must be provided.');
    }

    const id = this.idGenerator.generate();
    return new Tag(id, dto.name, TagType.UserDefined);
  }

  /**
   * Create a user-defined Tag entity.
   * @param id tag identifier.
   * @param dto tag data.
   * @returns A tag entity.
   */
  public async from(id: IdentifierType, dto: TagDto): Promise<Tag> {
    if (!Identifier.isValid(id)) {
      throw new Error(`Id value ${id} is invalid.`);
    }
    return new Tag(id, dto.name, TagType.UserDefined);
  }
}

export class Tag implements Identifiable {
  public readonly id: IdentifierType;
  public readonly name: string;
  public readonly type: TagType;

  public constructor(id: IdentifierType, name: string, type: TagType) {
    if (!Identifier.isValid(id)) {
      throw new Error(`Given id: ${id} is invalid.`);
    }
    this.id = id;

    if (isEmpty(name)) {
      throw new Error('Name must not be empty.');
    }
    this.name = (type === TagType.UserDefined)
      ? name.toLowerCase()
      : text.capitalize(name);

    if (type !== TagType.UserDefined && type !== TagType.Project) {
      throw new Error('Tag type is not supported');
    }
    this.type = type;
  }

  public toResource(): TagResource {
    return {
      href: api.tags.resolveHref(this.id),
      name: this.name,
      type: this.type
    };
  }
}
