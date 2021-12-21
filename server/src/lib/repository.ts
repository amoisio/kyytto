export default interface Repository<T> {
    getAll(): Promise<T[]>;
    get(id: string): Promise<T>;
    create(item: T): Promise<string>;
    update(item: T): Promise<void>;
}