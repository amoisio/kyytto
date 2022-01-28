import Repository from '../repository.js';
import { Low } from 'lowdb'
import { DataDb, StackDb, UserDb } from './db-model.js';
import { Identifier, IdentifierType } from 'kyytto-models';
import { Tag } from '../../resources/tags/tag.js';
import { User } from '../../resources/users/user.js';
import { Stack } from '../../resources/stacks/stack.js';

export default class UserRepository implements Repository<User> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<User[]> {
    return this.db.data!.users.map(p => this.constructUser(p));
  }

  public async getById(id: IdentifierType): Promise<User> {
    const match = this.db.data!.users.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructUser(match);
    } else {
      throw new Error(`No user found for ${id}.`);
    }
  }

  public async findById(id: IdentifierType): Promise<User | undefined> {
    const match = this.db.data!.users.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructUser(match);
    } else {
      return undefined;
    }
  }

  private constructUser(model: UserDb): User {
    let stack = (model.stack)
      ? this.constructStack(model.stack)
      : undefined;
    return new User(
      Identifier.build(model.id),
      model.name,
      stack);
  }

  private constructStack(model: StackDb): Stack {
    return new Stack(
      Identifier.build(model.id),
      model.name,
      model.description,
      model.match,
      model.tags.map(tag => new Tag(tag.id, tag.name, tag.type)));
  }

  public async add(user: User): Promise<void> {
    this.db.data!.users.push({
      id: user.id,
      name: user.name,
      stack: user.stack
    });
  }

  public async update(user: User): Promise<void> {
    const match = this.db.data!.users.find(p => p.id === user.id);
    if (match !== undefined) {
      match.name = user.name;
      match.stack = user.stack;
    } else {
      throw new Error(`No user found for ${user.id}.`);
    }
  }

  public async delete(id: IdentifierType): Promise<void> {
    const index = this.db.data!.users.findIndex(t => t.id === id);
    if (index !== -1) {
      this.db.data!.users.splice(index, 1);
    } else {
      throw new Error(`No user found for ${id}.`);
    }
  }
}
