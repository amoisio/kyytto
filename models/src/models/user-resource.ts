import { Resource, ResourceReference } from './resource.js';

export interface UserResource extends Resource {
  name: string;
  stackHref?: ResourceReference;
}
