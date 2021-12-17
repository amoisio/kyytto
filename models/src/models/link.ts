import { Resource } from "./resource";

export interface Link extends Resource {
  href: string;
  title: string;
  icon: string;
}
