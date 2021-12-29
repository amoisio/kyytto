import { Entity } from "./entity";

export interface IService<TEntity extends Entity> {
  create(newEntity: TEntity): TEntity;
  getAll(): TEntity[];
  getById(id: string): TEntity;
  update(entity: TEntity): void;
  remove(id: string): void;
}
