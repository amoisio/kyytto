import { IdentifierType } from './identifier.js';
import { MatchType } from './stack-resource.js';

export interface StackDto {
  name: string;
  description?: string;
  match: MatchType;
  tagIds: IdentifierType[];
}
