import { Resource } from './resource.js';

export interface MenuResource extends Resource {
  title: string;
  children ?: MenuResource[];
}