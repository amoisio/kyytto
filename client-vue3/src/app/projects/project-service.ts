import { Project } from './project-models';
import { LocalStorageRepository } from '@/shared/local-storage-repository';
import { LocalStorage } from '@/shared/local-storage';
import * as mappers from '@/shared/mappers';
import { ApiClient, idBuilder, Identifier, ProjectResource } from 'kyytto-models';

export interface ProjectService {
  save(project: Project): Promise<Identifier>;
  create(newProject: Project): Promise<Identifier>;
  getAll(): Promise<Project[]>;
  getById(id: Identifier): Promise<Project>
  update(project: Project): Promise<Identifier>;
  delete(id: Identifier): Promise<void>;
}

export class ApiProjectService implements ProjectService {
  private readonly client: ApiClient;
  
  constructor(client: ApiClient) {
    this.client = client;
  }

  public async save(project: Project): Promise<Identifier> {
    if (project.id.isNil()) {
      return await this.create(project);
    } else {
      return await this.update(project);
    }
  }

  public async create(newProject: Project): Promise<Identifier> {
    const resource = mappers.projectResourceMapper(newProject);
    const id = await this.client.postProject(resource);
    return id;
  }

  public async getAll(): Promise<Project[]> {
    const resources = await this.client.getProjects();
    return resources.map(resource => Project.from(resource));
  }

  public async getById(id: Identifier): Promise<Project> {
    const resource = await this.client.getProject(id);
    return Project.from(resource);
  }

  public async update(project: Project): Promise<Identifier> {
    const resource = mappers.projectResourceMapper(project);
    await this.client.putProject(resource);
    return project.id;
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

  public async save(project: Project): Promise<Identifier> {
    if (project.id.isNil()) {
      return await this.create(project);
    } else {
      return await this.update(project);
    }
  }

  public async create(newProject: Project): Promise<Identifier> {
    const item = mappers.projectResourceMapper(newProject);
    const id = this.repository.add(item);
    return idBuilder(id);
  }

  public async getAll(): Promise<Project[]> {
    const items = this.repository.getAll();
    return items.map(item => Project.from(item));
  }

  public async getById(id: Identifier): Promise<Project> {
    const item = this.repository.getById(id.value);
    return Project.from(item);
  }

  public async update(project: Project): Promise<Identifier> {
    const item = mappers.projectResourceMapper(project);
    this.repository.update(item);
    return project.id;
  }

  public async delete(id: Identifier): Promise<void> {
    this.repository.remove(id.value);
  }
}
