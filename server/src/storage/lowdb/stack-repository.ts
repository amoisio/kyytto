import Repository from '../repository.js';
import { Low } from 'lowdb'
import { DataDb, StackDb, TagDb } from './db-model.js';
import { Identifier, IdentifierType } from 'k-models';
import { Tag } from '../../resources/tags/tag.js';
import { Stack } from '../../resources/stacks/stack.js';

export default class StackRepository implements Repository<Stack> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Stack[]> {
    return this.db.data!.stacks.map(p => this.constructStack(p));
  }

  public async getById(id: IdentifierType): Promise<Stack> {
    const match = this.db.data!.stacks.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructStack(match);
    } else {
      throw new Error(`No stack found for ${id}.`);
    }
  }

  public async findById(id: IdentifierType): Promise<Stack | undefined> {
    const match = this.db.data!.stacks.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructStack(match);
    } else {
      return undefined;
    }
  }

  private constructStack(model: StackDb): Stack {
    return new Stack(
      Identifier.build(model.id),
      model.name,
      model.description,
      model.match,
      model.tags.map(tag => new Tag(tag.id, tag.name, tag.type)));
  }

  public async add(stack: Stack): Promise<void> {
    this.db.data!.stacks.push({
      id: stack.id,
      name: stack.name,
      description: stack.description,
      match: stack.match,
      tags: stack.tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        type: tag.type
      }))
    });
  }

  public async update(stack: Stack): Promise<void> {
    const match = this.db.data!.stacks.find(p => p.id === stack.id);
    if (match !== undefined) {
      match.name = stack.name;
      match.match = stack.match;
      match.tags = stack.tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        type: tag.type
      }));
    } else {
      throw new Error(`No tag found for ${stack.id}.`);
    }
  }

  public async delete(id: IdentifierType): Promise<void> {
    const index = this.db.data!.stacks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.db.data!.stacks.splice(index, 1);
    } else {
      throw new Error(`No stack found for ${id}.`);
    }
  }
}
