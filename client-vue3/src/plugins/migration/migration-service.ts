import { LocalStorage } from '../../shared/local-storage';
import { client } from '@/app/api';

export class MigrationService {
  private readonly store: LocalStorage;
  constructor() {
    this.store = new LocalStorage();
  }

  public async migrate(): Promise<void> {
    const projects = this.store.projectRepository.getAll();
    for (let project of projects) {
      await client.migrateProject(project)
    }
    const tasks = this.store.taskRepository.getAll();
    for (let task of tasks) {
      await client.migrateTask(task);
    }
  }
}
