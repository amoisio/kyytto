import { Connection, RowDataPacket } from 'mysql2/promise';
import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Task } from '../../resources/tasks/task.js';
import { IdentifierType } from 'kyytto-models';

export default class TaskRepository implements Repository<Task>{

  constructor(private connection: Connection) { }

  public async getAll(): Promise<Task[]> {
    const cmd = this.selectAll;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd);
    if (rowData[0].length == 0) {
      return [];
    } else {
      return rowData[0].map(row => this.constructTask(row));
    }
  }

  private selectAll = `
    select 
      t.id as task_id, 
      t.title, 
      t.description as task_description, 
      t.state, 
      t.project_id, 
      p.name, 
      p.description as project_description, 
      p.color
    from 
      tasks t inner join 
      projects p on t.project_id = p.id;`;

  public async getById(id: IdentifierType): Promise<Task> {
    const cmd = this.selectById;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
    if (rowData[0].length == 0) {
      throw new Error(`No Task found for ${id}.`);
    } else {
      return this.constructTask(rowData[0][0])
    }
  }

  public async findById(id: IdentifierType): Promise<Task | undefined> {
    const cmd = this.selectById;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
    if (rowData[0].length == 0) {
      return undefined;
    } else {
      return this.constructTask(rowData[0][0])
    }
  }

  private selectById = `
    select
      t.id as task_id,
      t.title,
      t.description as task_description,
      t.state,
      t.project_id,
      p.name,
      p.description as project_description,
      p.color
    from
      tasks t inner join
      projects p on t.project_id = p.id
    where
      t.id = ?;`;

  private constructTask(row: RowDataPacket): Task {
    return new Task(
      row.task_id,
      row.title,
      row.task_description,
      row.state,
      new Project(
        row.project_id,
        row.name,
        row.project_description,
        row.color
      )
    );
  }

  public async add(task: Task): Promise<void> {
    await this.connection.execute(this.insertTask, [
      task.id,
      task.title,
      task.description,
      task.state,
      task.project.id
    ]);
  }

  private insertTask = `
    insert into tasks (id, title, description, state, project_id)
    values (?, ?, ?, ?, ?);`;

  public async update(task: Task): Promise<void> {
    await this.connection.execute(this.updateTask, [
      task.title,
      task.description,
      task.state,
      task.project.id,
      task.id
    ]);
  }

  private updateTask = `
    update tasks 
    set title = ?, description = ?, state = ?, project_id = ?
    where id = ?;`;

  public async delete(id: IdentifierType): Promise<void> {
    await this.connection.execute(this.deleteTask, [ id ]);
  }

  private deleteTask = `
    delete from tasks where id = ?;`
}
