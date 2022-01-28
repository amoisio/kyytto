import { TagType, TaskState, MatchType } from 'kyytto-models';

export interface DataDb {
  projects: ProjectDb[];
  tasks: TaskDb[];
  tags: TagDb[];
  stacks: StackDb[];
  users: UserDb[];
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
  isBug: boolean | undefined;
}

export interface TagDb {
  id: string;
  name: string;
  type: TagType;
}

export interface StackDb {
  id: string;
  name: string;
  description: string | undefined;
  match: MatchType;
  tags: TagDb[];
}

export interface UserDb {
  id: string;
  name: string;
  stack?: StackDb
}