import { IProject, INewProject } from './project';
import { v4 as uuidv4 } from 'uuid';

export interface IProjectService {
  create(project: INewProject): IProject;
  getAll(): IProject[];
  update(project: IProject): void;
}

export class ProjectService implements IProjectService {
  public create(project: INewProject): IProject {
    const item = this.createProject(project);
    const notes = this.getAll();
    notes.push(item);
    this.setProjects(notes);
    return item;
  }

  private createProject(project: INewProject): IProject {
    const id = uuidv4();
    const color = '';
    const item = {
      href: `/projects/${id}`,
      name: project.name,
      description: project.description,
      color: color
    } as IProject;
    return item;
  }

  public getAll(): IProject[] {
    const str = localStorage.getItem('projects');
    return str === null ? [] : JSON.parse(str);
  }

  public update(project: IProject): void {
    const projects = this.getAll();
    const match = projects.find(item => item.href === project.href);
    if (match !== undefined) {
      match.name = project.name;
      match.description = project.description;
      match.color = project.color;
      this.setProjects(projects);
    } else {
      throw new Error(`Project ${project.href} not found!`);
    }
  }

  private setProjects(projects: IProject[]) {
    const str = JSON.stringify(projects);
    localStorage.setItem('projects', str);
  }
}
