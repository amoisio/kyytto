import Repository from '../repository.js';
import { Low } from 'lowdb'
import { DataDb, TagDb } from './db-model.js';
import { Identifier, IdentifierType } from 'kyytto-models';
import { Tag } from '../../resources/tags/tag.js';

export default class TagRepository implements Repository<Tag> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Tag[]> {
    return this.db.data!.tags.map(p => this.constructTag(p));
  }

  public async getById(id: IdentifierType): Promise<Tag> {
    const match = this.db.data!.tags.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructTag(match);
    } else {
      throw new Error(`No tag found for ${id}.`);
    }
  }

  public async findById(id: IdentifierType): Promise<Tag | undefined> {
    const match = this.db.data!.tags.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructTag(match);
    } else {
      return undefined;
    }
  }

  private constructTag(model: TagDb): Tag {
    const project = this.db.data?.tags.find(p => p.id === model.id);
    return new Tag(
      Identifier.build(model.id),
      model.name,
      model.type);
  }

  public async add(tag: Tag): Promise<void> {
    this.db.data!.tags.push({
      id: tag.id,
      name: tag.name,
      type: tag.type
    });
  }

  public async update(tag: Tag): Promise<void> {
    const match = this.db.data!.tags.find(p => p.id === tag.id);
    if (match !== undefined) {
      match.name = tag.name;
      match.type = tag.type;
    } else {
      throw new Error(`No tag found for ${tag.id}.`);
    }
  }

  public async delete(id: IdentifierType): Promise<void> {
    const index = this.db.data!.tags.findIndex(t => t.id === id);
    if (index !== -1) {
      this.db.data!.tags.splice(index, 1);
    } else {
      throw new Error(`No tag found for ${id}.`);
    }
  }
}
