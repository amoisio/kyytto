import { api } from '../api.js';
import { Identifiable, Identifier, IdentifierType, TagResource, TagType } from 'kyytto-models';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';

export class TagBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator) { }

  /**
   * Creates a new Tag.
   * @param name Tag name.
   * @param type Tag type.
   * @returns A newly created tag with generated id.
   */
  public async new(name: string): Promise<Tag> {
    if (isEmpty(name)) {
      throw new Error('Name must be provided.');
    }

    const id = this.idGenerator.generate();
    return new Tag(id, name, TagType.UserDefined);
  }

  /**
   * Create a Tag entity from the given resource representation.
   * @param resource tag resource.
   * @returns A tag entity corresponding the resource representation.
   */
  public async from(resource: TagResource): Promise<Tag> {
    const id = api.resolveId(resource.href);
    if (id === undefined) {
      throw new Error('Unable to resolve resource id.');
    }
    return new Tag(
      id,
      resource.name,
      resource.type);
  }
}

export class Tag implements Identifiable {
  public readonly id: IdentifierType;
  public readonly name: string;
  public readonly type: TagType;

  public constructor(id: IdentifierType, name: string, type: TagType) {
    if (!id || Identifier.isNil(id) || !Identifier.isValid(id)) {
      throw new Error(`Given id: ${id} is invalid.`);
    }
    this.id = id;
    
    if (isEmpty(name)) {
      throw new Error('Name must not be empty.');
    }
    this.name = name;

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
