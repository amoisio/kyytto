import { Resource } from './resource.js';

export interface MenuResource extends Resource {
  children ?: MenuResource[];
}