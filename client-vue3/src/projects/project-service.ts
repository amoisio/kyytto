import { IProject } from './project-models';
import { v4 as uuidv4 } from 'uuid';
import { IRepository } from '@/irepository';

export interface IProjectService {
  create(name: string, description: string | undefined, color: string): string;
  getAll(): IProject[];
  getById(id: string): IProject;
  update(project: IProject): void;
  remove(id: string): void;
}

export class ProjectService implements IProjectService {
  constructor(private repository: IRepository<IProject>) {}

  public create(name: string, description: string | undefined, color: string): string {
    const id = uuidv4();
    const project = this.createProject(id, name, description, color);
    this.repository.add(project);
    return id;
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
