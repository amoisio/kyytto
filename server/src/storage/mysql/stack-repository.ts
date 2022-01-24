import Repository from '../repository.js';
import { Connection } from 'mysql2/promise';
import { IdentifierType } from 'kyytto-models';
import { Stack } from '../../resources/stacks/stack.js';


export default class StackRepository implements Repository<Stack> {
  constructor(private connection: Connection) { }

  public async getAll(): Promise<Stack[]> {
    throw new Error('Not implemented.');
  }

  public async getById(id: IdentifierType): Promise<Stack> {
    throw new Error('Not implemented.');
  }

  public async findById(id: IdentifierType): Promise<Stack> {
    throw new Error('Not implemented.');
  }

  public async add(stack: Stack): Promise<void> {
    throw new Error('Not implemented.');
  }

  public async update(stack: Stack): Promise<void> {
    throw new Error('Not implemented.');
  }

  public async delete(id: IdentifierType): Promise<void> {
    throw new Error('Not implemented.');
  }
}
