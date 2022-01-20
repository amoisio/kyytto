import { v4 as uuidv4 } from 'uuid';
import { Resource, Utilities } from 'kyytto-models';
import { api } from '@/app/api';

export class LocalStorageRepository<TResouce extends Resource> {
  constructor(private storageKey: string, private baseUrl: string) {}

  public add(item: TResouce): string {
    const items = this.readItems();
    const id = uuidv4();
    item.href = `${this.baseUrl}/${id}`;
    items.push(item);
    this.writeItems(items);
    return id;
  }

  public exists(id: string): boolean {
    const items = this.readItems();
    return this.existsIn(items, id);
  }

  public getAll(): TResouce[] {
    return this.readItems();
  }

  public getById(id: string): TResouce {
    const items = this.readItems();
    const item = this.selectFrom(items, id);
    if (item === undefined) {
      throw new Error(`No item exists with id ${id}.`);
    } else {
      return item;
    }
  }

  public update(item: TResouce): void {
    const entities = this.readItems();
    const id = this.entityId(item);
    if (!this.existsIn(entities, id)) {
      throw new Error(`No item exists with id ${id}.`);
    } else {
      const index = this.entityIndex(entities, id);
      entities.splice(index, 1, item);
      this.writeItems(entities);
    }
  }

  public remove(id: string): void {
    const items = this.readItems();
    const index = this.entityIndex(items, id);
    items.splice(index, 1);
    this.writeItems(items);
  }

  private entityId(item: TResouce): string {
    const id = api.resolveId(item.href);
    if (Utilities.isEmpty(id)){
      throw new Error(`Resolved empty identifier from ${item.href}.`);
    }
    return id!;
  }

  private readItems(): TResouce[] {
    const str = localStorage.getItem(this.storageKey);
    return str === null ? [] : JSON.parse(str);
  }

  private writeItems(items: TResouce[]) {
    const str = JSON.stringify(items);
    localStorage.setItem(this.storageKey, str);
  }

  private existsIn(items: TResouce[], id: string): boolean {
    const match = this.selectFrom(items, id);
    return match !== undefined;
  }

  private selectFrom(items: TResouce[], id: string): TResouce | undefined {
    return items.find((item) => this.entityId(item) === id);
  }

  private entityIndex(items: TResouce[], id: string): number {
    return items.findIndex((item) => this.entityId(item) === id);
  }
}
