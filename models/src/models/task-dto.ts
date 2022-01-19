import { IdentifierType } from './identifier.js';
import { TaskState } from './task-state.js';

export interface TaskDto {
  title: string;
  description?: string;
  state: TaskState;
  projectId: IdentifierType,
  tagIds: IdentifierType[]
}
