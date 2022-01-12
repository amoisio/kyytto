import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Low } from 'lowdb'
import { DataDb, ProjectDb } from './db-model.js';
import { Color, colorBuilder, idBuilder, Identifier } from 'kyytto-models';

export default class ProjectRepository implements Repository<Project> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Project[]> {
    return this.db.data!.projects.map(p => this.constructProject(p));
  }

  public async getById(id: Identifier): Promise<Project> {
    const match = this.db.data!.projects.find(p => p.id === id.value);
    if (match !== undefined) {
      return this.constructProject(match);
    } else {
      throw new Error(`Project with id ${id} not found.`);
    }
  }

  public async findById(id: Identifier): Promise<Project | undefined> {
    const match = this.db.data!.projects.find(p => p.id === id.value);
    if (match !== undefined) {
      return this.constructProject(match);
    } else {
      return undefined;
    }
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      idBuilder(model.id),
      model.name,
      model.description,
      colorBuilder(model.color)
    );
  }

  public async add(project: Project): Promise<void> {
    this.db.data!.projects.push({
      id: project.id.value,
      name: project.name,
      description: project.description,
      color: project.color.value
    });
  }

  public async update(project: Project): Promise<void> {
    const match = this.db.data!.projects.find(p => p.id === project.id.value);
    if (match !== undefined) {
      match.name = project.name;
      match.description = project.description;
      match.color = project.color.value;
    } else {
      throw new Error(`No Project found for ${project.id}.`);
    }
  }

  public async delete(id: Identifier): Promise<void> {
    const index = this.db.data!.projects.findIndex(p => p.id === id.value);
    if (index !== -1) {
      const tasks = this.db.data!.tasks.filter(task => task.projectId === id.value);
      for (const task of tasks) {
        const taskIndex = this.db.data!.tasks.findIndex(t => t.id === task.id);
        this.db.data!.tasks.splice(taskIndex, 1);
      }
      this.db.data!.projects.splice(index, 1);
    } else {
      throw new Error(`No Project found for ${id}.`);
    }
  }
}
