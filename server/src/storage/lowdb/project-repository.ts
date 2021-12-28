import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Low } from 'lowdb'
import { DataDb, ProjectDb } from './db-model.js';
import { Identifier } from '../../utilities/identifier-generator.js';
import { Color } from '../../utilities/color-generator.js';

export default class ProjectRepository implements Repository<Project> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Project[]> {
    return this.db.data!.projects.map(p => this.constructProject(p));
  }

  public async getById(id: Identifier): Promise<Project> {
    const match = this.db.data!.projects.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructProject(match);
    } else {
      throw new Error(`Project with id ${id} not found.`);
    }
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      new Identifier(model.id),
      model.name,
      model.description,
      new Color(model.color, true)
    );
  }

  public async add(project: Project): Promise<void> {
    this.db.data!.projects.push({
      id: project.id.valueOf(),
      name: project.name,
      description: project.description,
      color: project.color.valueOf()
    });
  }

  public async update(project: Project): Promise<void> {
    const match = this.db.data!.projects.find(p => p.id === project.id);
    if (match !== undefined) {
      match.name = project.name;
      match.description = project.description;
      match.color = project.color.valueOf();
    } else {
      throw new Error(`No Project found for ${project.id}.`);
    }
  }

  public async delete(id: Identifier): Promise<void> {
    const index = this.db.data!.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      const tasks = this.db.data!.tasks.filter(task => task.projectId === id);
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
