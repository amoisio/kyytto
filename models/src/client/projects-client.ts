import { AxiosInstance } from 'axios';
import { ProjectsApi } from '../api/projects-api.js';
import { ProjectDto } from '../models/project-dto.js';
import { ProjectResource } from '../models/project-resource.js';
import { IdentifierType } from '../models/identifier.js';
import { ApiClient, BaseEndPointClient } from './api-client.js';

export class ProjectsApiEndPointClient extends BaseEndPointClient implements ApiClient<ProjectDto, ProjectResource> {
  private readonly api: ProjectsApi;
  constructor(ax: AxiosInstance, api: ProjectsApi) {
    super(ax);
    this.api = api;
  }
  public async getAll(): Promise<ProjectResource[]> {
    const response = await this.ax.get<ProjectResource[]>(this.api.resolve());
    return response.data;
  }
  public async create(dto: ProjectDto): Promise<IdentifierType> {
    const response = await this.ax.post<IdentifierType>(this.api.resolve(), dto);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      return response.data;
    }
  }
  public async getById(id: IdentifierType): Promise<ProjectResource> {
    const response = await this.ax.get<ProjectResource>(this.api.byId.resolve(undefined, id));
    return response.data;
  }
  public async update(id: IdentifierType, dto: ProjectDto): Promise<void> {
    await this.ax.put<void>(this.api.byId.resolve(undefined, id), dto);
  }
  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(this.api.byId.resolve(undefined, id));
  }
}
