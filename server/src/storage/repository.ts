import { Identifiable, IdentifierType } from 'kyytto-models';

/**
 * Represents a repository of identifiable instances.
 */
export default interface Repository<TEntity extends Identifiable> {
  getAll(): Promise<TEntity[]>;
  getById(id: IdentifierType): Promise<TEntity>;
  findById(id: IdentifierType): Promise<TEntity | undefined>;
  add(entity: TEntity): Promise<void>;
  update(entity: TEntity): Promise<void>;
  delete(id: IdentifierType): Promise<void>;
}