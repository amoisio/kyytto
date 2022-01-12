import { TagType, TaskState } from 'kyytto-models';

export interface DataDb {
  projects: ProjectDb[];
  tasks: TaskDb[];
  tags: TagDb[];
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
  tags: TagDb[];
}

export interface TagDb {
  id: string;
  name: string;
  type: TagType;
}