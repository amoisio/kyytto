import Identifiable from "identifiable";

/**
 * Represents a repository of identifiable instances.
 */
export default interface Repository<TEntity extends Identifiable> {
    getAll(): Promise<TEntity[]>;
    get(id: string): Promise<TEntity>;
    create(item: TEntity): Promise<string>;
    update(item: TEntity): Promise<void>;
    delete(id: string): Promise<void>;
}