import { IProject, Project } from './project-models';
import { LocalStorageRepository } from '@/shared/local-storage-repository';
import { IService } from '@/shared/iservice';
import { LocalStorage } from '@/shared/local-storage';
import * as mappers from '@/shared/mappers';
import { ProjectResource } from 'kyytto-models';

export interface IProjectService extends IService<IProject> {

}

export class LocalStorageProjectService implements IProjectService {
  private readonly repository: LocalStorageRepository<ProjectResource>;
  constructor(store: LocalStorage) {
    this.repository = store.projectRepository;
  }

  public create(newProject: IProject): IProject {
    const item = mappers.projectResourceMapper(newProject);
    const id = this.repository.add(item);
    return this.getById(id);
  }

  public getAll(): IProject[] {
    const items = this.repository.getAll();
    return items.map(item => Project.createFrom(item));
  }

  public getById(id: string): IProject {
    const item = this.repository.getById(id);
    return Project.createFrom(item);
  }

  public update(project: IProject): void {
    const item = mappers.projectResourceMapper(project);
    this.repository.update(item);
  }

  public remove(id: string): void {
    this.repository.remove(id);
  }
}
