import { Project, ProjectCollection } from './project-models';
import { Identifier, IdentifierType, KyyttoClient } from 'kyytto-models';

export interface ProjectService {
  save(project: Project): Promise<IdentifierType>;
  create(project: Project): Promise<IdentifierType>;
  getAll(): Promise<Project[]>;
  getById(id: IdentifierType): Promise<Project>
  update(project: Project): Promise<IdentifierType>;
  delete(id: IdentifierType): Promise<void>;
}

export class ApiProjectService implements ProjectService {
  private readonly client: KyyttoClient;

  constructor(client: KyyttoClient) {
    this.client = client;
  }

  public async save(project: Project): Promise<IdentifierType> {
    if (Identifier.isNil(project.id)) {
      return await this.create(project);
    } else {
      return await this.update(project);
    }
  }

  public async create(project: Project): Promise<IdentifierType> {
    const dto = project.toDto();
    const id = await this.client.projects.create(dto);
    return id;
  }

  public async getAll(): Promise<Project[]> {
    const resources = await this.client.projects.getAll();
    return new ProjectCollection(resources);
  }

  public async getById(id: IdentifierType): Promise<Project> {
    const resource = await this.client.projects.getById(id);
    return new Project(resource);
  }

  public async update(project: Project): Promise<IdentifierType> {
    const dto = project.toDto();
    await this.client.projects.update(project.id, dto);
    return project.id;
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.client.projects.delete(id);
  }
}
