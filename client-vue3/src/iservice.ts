import { IResource } from "./iresource";

export interface IService<TEntity extends IResource> {
  getAll(): TEntity[];
  getById(id: string): TEntity;
  update(project: TEntity): void;
  remove(id: string): void;
}
