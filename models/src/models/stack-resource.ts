import { Resource, ResourceReference } from './resource.js';

export enum MatchType {
  Exact,
  All,
  Any
}

export interface StackResource extends Resource {
  name: string;
  match: MatchType;
  tagHrefs: ResourceReference[];
}
