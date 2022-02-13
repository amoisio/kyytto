import { ColorType } from './color.js';

export interface ProjectDto {
  name: string;
  description?: string;
  color: ColorType;
}
