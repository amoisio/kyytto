import { Identifier } from 'src';

export interface Href {
  base: string; // protocol + hostname
  port: string;
  extension: string;
  segments: string[];
  query: string[][];
  rel: string;
  id: Identifier;
}
