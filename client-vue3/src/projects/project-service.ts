import { IProject, INewProject } from './project';
import { v4 as uuidv4 } from 'uuid';
import { pickColor } from '@/lib/colorPicker';
export interface IProjectService {
  create(project: IProject): void;
  getAll(): IProject[];
  update(project: IProject): void;
  remove(project: IProject): void;
}

export class ProjectService implements IProjectService {
  public create(project: IProject): void {
    const item = this.createProject(project);
    const notes = this.getAll();
    notes.push(item);
    this.setProjects(notes);
  }

  private createProject(project: IProject): IProject {
    const id = uuidv4();
    // const color = pickColor(this.getAll().map((pro) => pro.color));
    const item = {
      href: `/projects/${id}`,
      name: project.name,
      description: project.description,
      color: project.color
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

  public remove(project: IProject): void {
    const projects = this.getAll();
    const newProjects = projects.filter((item) => item.href !== project.href);
    this.setProjects(newProjects);
  }
}
