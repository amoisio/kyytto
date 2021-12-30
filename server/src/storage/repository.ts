import { Identifier } from 'kyytto-models';
import Identifiable from '../resources/identifiable.js';

/**
 * Represents a repository of identifiable instances.
 */
export default interface Repository<TEntity extends Identifiable> {
  getAll(): Promise<TEntity[]>;
  getById(id: Identifier): Promise<TEntity>;
  add(entity: TEntity): Promise<void>;
  update(entity: TEntity): Promise<void>;
  delete(id: Identifier): Promise<void>;
}