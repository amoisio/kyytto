import { IProject, Project } from './project-models';
import { LocalStorageRepository } from '@/shared/local-storage-repository';
import { LocalStorage } from '@/shared/local-storage';
import * as mappers from '@/shared/mappers';
import { ApiClient, idBuilder, Identifier, ProjectResource } from 'kyytto-models';

export interface ProjectService {
  create(newProject: IProject): Promise<Identifier>;
  getAll(): Promise<IProject[]>;
  getById(id: Identifier): Promise<IProject>
  update(project: IProject): Promise<void>;
  delete(id: Identifier): Promise<void>;
}

export class ApiProjectService implements ProjectService {
  private readonly client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }

  public async create(newProject: IProject): Promise<Identifier> {
    const resource = mappers.projectResourceMapper(newProject);
    const id = await this.client.postProject(resource);
    return id;
  }

  public async getAll(): Promise<IProject[]> {
    const resources = await this.client.getProjects();
    return resources.map(resource => Project.createFrom(resource));
  }

  public async getById(id: Identifier): Promise<IProject> {
    const resource = await this.client.getProject(id);
    return Project.createFrom(resource);
  }

  public async update(project: IProject): Promise<void> {
    const resource = mappers.projectResourceMapper(project);
    await this.client.putProject(resource);
  }

  public async delete(id: Identifier): Promise<void> {
    await this.client.deleteProject(id);
  }
}

export class LocalStorageProjectService implements ProjectService {
  private readonly repository: LocalStorageRepository<ProjectResource>;
  constructor(store: LocalStorage) {
    this.repository = store.projectRepository;
  }

  public async create(newProject: IProject): Promise<Identifier> {
    const item = mappers.projectResourceMapper(newProject);
    const id = this.repository.add(item);
    return idBuilder(id);
  }

  public async getAll(): Promise<IProject[]> {
    const items = this.repository.getAll();
    return items.map(item => Project.createFrom(item));
  }

  public async getById(id: Identifier): Promise<IProject> {
    const item = this.repository.getById(id.value);
    return Project.createFrom(item);
  }

  public async update(project: IProject): Promise<void> {
    const item = mappers.projectResourceMapper(project);
    this.repository.update(item);
  }

  public async delete(id: Identifier): Promise<void> {
    this.repository.remove(id.value);
  }
}
