import { Connection, RowDataPacket } from 'mysql2/promise';
import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Identifier } from 'kyytto-models';

export default class ProjectRepository implements Repository<Project> {
  constructor(private connection: Connection) { }

  public async getAll(): Promise<Project[]> {
    const cmd = this.selectAll;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd);
    if (rowData[0].length == 0) {
      return [];
    } else {
      return rowData[0].map(row => this.constructProject(row));
    }
  }

  private selectAll = `
    select p.id, p.name, p.description, p.color
    from projects p;`;

  public async getById(id: Identifier): Promise<Project> {
    const cmd = this.selectById;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
    if (rowData[0].length == 0) {
      throw new Error(`No Project found for ${id}.`);
    } else {
      return this.constructProject(rowData[0][0]);
    }
  }

  private selectById = `
    select p.id, p.name, p.description, p.color
    from projects p
    where p.id = ?;`;

  private constructProject(row: RowDataPacket): Project {
    return new Project(
      row.id,
      row.name,
      row.description,
      row.color
    );
  }

  public async add(project: Project): Promise<void> {
    await this.connection.execute(this.insertProject, [
      project.id,
      project.name,
      project.description,
      project.color,
    ]);
  }

  private insertProject = `
    insert into projects (id, name, description, color)
    values (?, ?, ?, ?);`;

  public async update(project: Project): Promise<void> {
    await this.connection.execute(this.updateProject, [
      project.name,
      project.description,
      project.color,
      project.id,
    ]);
  }

  private updateProject = `
    update projects
    set name = ?, description = ?, color = ?
    where id = ?;`;

  public async delete(id: Identifier): Promise<void> {
    await this.connection.execute(this.deleteProject, [id]);
  }

  private deleteProject = `
    delete from projects where id = ?;`
}
