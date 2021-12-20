import { Resource, ResourceReference } from "./resource";

export interface Link extends Resource {
  href: ResourceReference;
  title: string;
  icon: string;
}
