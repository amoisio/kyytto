import { TaskState } from 'kyytto-models';

export interface DataDb {
  projects: ProjectDb[];
  tasks: TaskDb[];
}

export interface ProjectDb {
  id: string;
  name: string;
  description: string | undefined;
  color: string;
}

export interface TaskDb {
  id: string;
  title: string;
  description: string | undefined;
  state: TaskState;
  projectId: string;
}