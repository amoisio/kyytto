import { api } from '../api.js';
import { Identifiable, Identifier, IdentifierType, MatchType, StackDto, StackResource } from 'kyytto-models';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';
import { Tag } from '../tags/tag.js';
import UnitOfWork from '../../storage/unit-of-work.js';

export class StackBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator,
    private readonly unitOfWork: UnitOfWork) { }

  /**
   * Create a new Stack.
   * @param dto stack data.
   * @returns A newly created stack with a generated id.
   */
  public async new(dto: StackDto): Promise<Stack> {
    const name = dto.name;
    const description = dto.description;
    const match = dto.match;
    if (isEmpty(name)) {
      throw new Error('Name must be provided.');
    }
    const id = this.idGenerator.generate();
    const tags: Tag[] = [];
    for (const tagId of dto.tagIds) {
      const tag = await this.unitOfWork.tagRepository.findById(tagId)
      if (!tag) {
        throw new Error(`Tag id ${tagId} is invalid.`);
      }
      tags.push(tag);
    }
    return new Stack(id, name, description, match, tags);
  }

  /**
   * Create a Stack entity.
   * @param id stack identifier.
   * @param dto stack data.
   * @returns A stack entity.
   */
  public async from(id: IdentifierType, dto: StackDto): Promise<Stack> {
    if (!Identifier.isValid(id)) {
      throw new Error(`Stack id ${id} is invalid.`);
    }
    const name = dto.name;
    if (isEmpty(name)) {
      throw new Error('Name must be provided.');
    }
    const description = dto.description;
    const match = dto.match;
    const tags: Tag[] = [];
    for (const tagId of dto.tagIds) {
      const tag = await this.unitOfWork.tagRepository.findById(tagId);
      if (!tag) {
        throw new Error(`Tag id ${tagId} is invalid.`);
      }
      tags.push(tag);
    }
    return new Stack(id, name, description, match, tags);
  }
}

export class Stack implements Identifiable {
  public readonly id: IdentifierType;
  public name: string;
  public description: string | undefined;
  public match: MatchType;
  public tags: Tag[];

  public constructor(id: IdentifierType, name: string, description: string | undefined, match: MatchType, tags: Tag[]) {
    if (!Identifier.isValid(id)) {
      throw new Error(`Given id: ${id} is invalid.`);
    }
    this.id = id;
    if (isEmpty(name)) {
      throw new Error('Name must not be empty.');
    }
    this.name = name;
    this.description = description;
    this.match = match;
    this.tags = tags;
  }

  public toResource(): StackResource {
    return {
      href: api.stacks.resolveHref(this.id),
      name: this.name,
      description: this.description,
      match: this.match,
      tagHrefs: this.tags.map(t => api.tags.resolveHref(t.id))
    };
  }
}
