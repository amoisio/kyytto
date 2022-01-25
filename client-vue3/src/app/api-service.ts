import { Identifier, IdentifierType, Resource } from 'kyytto-models';
import { Entity } from '@/shared/entity';
import { ApiClient } from 'kyytto-models/dist/client/base-client';

export interface Service<TEntity extends Entity<TDto>, TDto> {
  save(entity: TEntity): Promise<IdentifierType>;
  create(entity: TEntity): Promise<IdentifierType>;
  getAll(): Promise<TEntity[]>;
  getById(id: IdentifierType): Promise<TEntity>
  update(entity: TEntity): Promise<IdentifierType>;
  delete(id: IdentifierType): Promise<void>;
}

export abstract class ApiService<TEntity extends Entity<TDto>, TDto, TResource extends Resource> implements Service<TEntity, TDto> {
  protected abstract getApiClient(): ApiClient<TDto, TResource>;
  private _apiClient: ApiClient<TDto, TResource> | undefined;
  protected get apiClient(): ApiClient<TDto, TResource> {
    if (this._apiClient === undefined) {
      this._apiClient = this.getApiClient();
    }
    return this._apiClient;
  }

  public async save(entity: TEntity): Promise<IdentifierType> {
    if (Identifier.isNil(entity.id)) {
      return await this.create(entity);
    } else {
      return await this.update(entity);
    }
  }

  public async create(entity: TEntity): Promise<IdentifierType> {
    const dto = entity.toDto();
    const id = await this.apiClient.create(dto);
    return id;
  }

  public async getAll(): Promise<TEntity[]> {
    const resources = await this.apiClient.getAll();
    const entities = await this.buildEntities(resources);
    return entities;
  }

  protected abstract buildEntities(resources: TResource[]): Promise<TEntity[]>;

  public async getById(id: IdentifierType): Promise<TEntity> {
    const resource = await this.apiClient.getById(id);
    const entity = await this.buildEntity(resource);
    return entity;
  }

  protected abstract buildEntity(resource: TResource): Promise<TEntity>;

  public async update(entity: TEntity): Promise<IdentifierType> {
    const dto = entity.toDto();
    await this.apiClient.update(entity.id, dto);
    return entity.id;
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.apiClient.delete(id);
  }
}
