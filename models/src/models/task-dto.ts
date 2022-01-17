import { IdentifierType } from './identifier.js';

export interface TaskDto {
  title: string;
  description?: string;
  projectId: IdentifierType,
  tagIds: IdentifierType[]
}
