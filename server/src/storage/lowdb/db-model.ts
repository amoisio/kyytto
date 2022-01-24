import { TagType, TaskState } from 'kyytto-models';
import { MatchType } from 'kyytto-models/dist/models/stack-resource';

export interface DataDb {
  projects: ProjectDb[];
  tasks: TaskDb[];
  tags: TagDb[];
  stacks: StackDb[];
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
  match: MatchType;
  tags: TagDb[];
}