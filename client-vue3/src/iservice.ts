import { IEntity } from "./iresource";

export interface IService<TEntity extends IEntity> {
  create(newEntity: TEntity): TEntity;
  getAll(): TEntity[];
  getById(id: string): TEntity;
  update(entity: TEntity): void;
  remove(id: string): void;
}
