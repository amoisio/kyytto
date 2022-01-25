import { IdentifierType } from './identifier';
import { MatchType } from './stack-resource';

export interface StackDto {
  name: string;
  description: string;
  match: MatchType;
  tagIds: IdentifierType[];
}
