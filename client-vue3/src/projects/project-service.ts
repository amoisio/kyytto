import { IProject } from './project-models';
import { v4 as uuidv4 } from 'uuid';
import { IProjectService } from './iproject-service';
import { LocalStorageRepository } from '@/local-storage-repository';

export class LocalStorageProjectService implements IProjectService {
  private repository: LocalStorageRepository<IProject>;
  constructor() {
    this.repository = new LocalStorageRepository<IProject>('projects');
  }

  public create(name: string, description: string | undefined, color: string): IProject {
    const id = uuidv4();
    const project = this.createProject(id, name, description, color);
    this.repository.add(project);
    return project;
  }

  private createProject(id: string, name: string, description: string | undefined, color: string): IProject {
    return {
      href: `http://localhost:8080/api/projects/${id}`,
      name: name,
      description: description,
      color: color
    } as IProject;
  }

  public getAll(): IProject[] {
    return this.repository.getAll();
  }

  public getById(id: string): IProject {
    return this.repository.getById(id);
  }

  public update(project: IProject): void {
    this.repository.update(project);
  }

  public remove(id: string): void {
    this.repository.remove(id);
  }
}
