import Repository from '../repository.js';
import { Tag } from '../../resources/tags/tag.js';
import { Connection } from 'mysql2/promise';
import { Identifier } from 'kyytto-models';


export default class TagRepository implements Repository<Tag> {
  constructor(private connection: Connection) { }

  public async getAll(): Promise<Tag[]> {
    throw new Error('Not implemented.');
  }

  public async getById(id: Identifier): Promise<Tag> {
    throw new Error('Not implemented.');
  }

  public async findById(id: Identifier): Promise<Tag> {
    throw new Error('Not implemented.');
  }

  public async add(tag: Tag): Promise<void> {
    throw new Error('Not implemented.');
  }

  public async update(tag: Tag): Promise<void> {
    throw new Error('Not implemented.');
  }

  public async delete(id: Identifier): Promise<void> {
    throw new Error('Not implemented.');
  }
}