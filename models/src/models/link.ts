import { Resource, ResourceReference } from './resource.js';

export interface Link extends Resource {
  href: ResourceReference;
  title: string;
  icon: string;
}
