import { Identifier, IdentifierType } from '../models/identifier.js';
import { ProjectDto } from '../models/project-dto.js';
import { AxiosInstance } from 'axios';
import { ProjectResource } from '../models/project-resource.js';
import { BaseApi } from './base-api.js';

export class ProjectsApi extends BaseApi {
  constructor(ax: AxiosInstance, path: string) {
    super(ax, path);
  }

  public async getAll(): Promise<ProjectResource[]> {
    const response = await this.ax.get<ProjectResource[]>(this.path);
    return response.data;
  }

  public async getById(id: IdentifierType): Promise<ProjectResource> {
    const response = await this.ax.get<ProjectResource>(`${this.path}/${id}`);
    return response.data;
  }

  public async create(project: ProjectDto): Promise<IdentifierType> {
    const response = await this.ax.post<string>(`${this.path}`, project);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      const id = Identifier.build(response.data);
      if (id === undefined) {
        throw new Error('POST response did not include a valid id.');
      } else {
        return id;
      }
    }
  }

  public async update(id: IdentifierType, project: ProjectDto): Promise<void> {
    await this.ax.put<void>(`${this.path}/${id}`, project);
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(`${this.path}/${id}`);
  }

  public async migrateProject(project: ProjectResource): Promise<void> {
    await this.ax.post<void>(`${this.path}/migration`, project);
  }
}
