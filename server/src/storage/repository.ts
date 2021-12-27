import Identifiable from 'identifiable.js';

/**
 * Represents a repository of identifiable instances.
 */
export default interface Repository<TEntity extends Identifiable> {
    getAll(): Promise<TEntity[]>;
    getById(id: string): Promise<TEntity>;
    create(entity: TEntity): Promise<void>;
    update(entity: TEntity): Promise<void>;
    delete(id: string): Promise<void>;
}