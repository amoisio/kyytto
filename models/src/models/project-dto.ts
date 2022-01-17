import { ColorType } from './color';

export interface ProjectDto {
  name: string;
  description?: string;
  color: ColorType;
}
