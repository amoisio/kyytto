import { IResource } from './iresource';
import { parse } from '@/lib/hrefParser';

export interface IRepository<TEntity> {
  add(entity: TEntity): void;
  exists(id: string): boolean;
  getAll(): TEntity[];
  getById(id: string): TEntity;
  update(entity: TEntity): void;
  remove(id: string): void;
}

export class LocalStorageRepository<TEntity extends IResource> implements IRepository<TEntity> {
  constructor(private storageKey: string) {}

  public add(entity: TEntity): void {
    const entities = this.readEntities();
    const id = this.entityId(entity);
    if (this.existsIn(entities, id)) {
      throw new Error(`Entity already exists with id ${id}.`);
    } else {
      entities.push(entity);
      this.writeEntities(entities);
    }
  }

  public exists(id: string): boolean {
    const entities = this.readEntities();
    return this.existsIn(entities, id);
  }

  public getAll(): TEntity[] {
    return this.readEntities();
  }

  public getById(id: string): TEntity {
    const entities = this.readEntities();
    const entity = this.selectFrom(entities, id);
    if (entity === undefined) {
      throw new Error(`No item exists with id ${id}.`);
    } else {
      return entity;
    }
  }

  public update(entity: TEntity): void {
    const entities = this.readEntities();
    const id = this.entityId(entity);
    if (!this.existsIn(entities, id)) {
      throw new Error(`No item exists with id ${id}.`);
    } else {
      const index = this.entityIndex(entities, id);
      entities.splice(index, 1, entity);
      this.writeEntities(entities);
    }
  }

  public remove(id: string): void {
    const entities = this.readEntities();
    const index = this.entityIndex(entities, id);
    entities.splice(index, 1);
    this.writeEntities(entities);
  }

  private entityId(entity: TEntity): string {
    const href = parse(entity.href);
    return href.id;
  }

  private readEntities(): TEntity[] {
    const str = localStorage.getItem(this.storageKey);
    return str === null ? [] : JSON.parse(str);
  }

  private writeEntities(entities: TEntity[]) {
    const str = JSON.stringify(entities);
    localStorage.setItem(this.storageKey, str);
  }

  private existsIn(entities: TEntity[], id: string): boolean {
    const match = this.selectFrom(entities, id);
    return match !== undefined;
  }

  private selectFrom(entities: TEntity[], id: string): TEntity | undefined {
    return entities.find((entity) => this.entityId(entity) === id);
  }

  private entityIndex(entities: TEntity[], id: string): number {
    return entities.findIndex((entity) => this.entityId(entity) === id);
  }
}
