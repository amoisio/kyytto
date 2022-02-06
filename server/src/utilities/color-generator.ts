import { ColorType } from 'k-models';
import UnitOfWork from '../storage/unit-of-work.js';

const allColorValues: ColorType[] = [
  '#005f73',
  '#0a9396',
  '#94d2bd',
  '#e9d8a6',
  '#ee9b00',
  '#ca6702',
  '#bb3e03',
  '#ae2012',
  '#9b2226'
];

export interface ColorGenerator {
  all(): ColorType[];
  available(): Promise<ColorType[]>;
  generate(): Promise<ColorType>;
}

export class NextUnusedColorGenerator implements ColorGenerator {
  constructor(private readonly uow: UnitOfWork) { }

  public all(): ColorType[] {
    return this.getAllColors();
  }

  public async available(): Promise<ColorType[]> {
    const colors = this.getAllColors();
    const usedColors = await this.getUsedColors();
    for (let usedColor of usedColors) {
      const index = colors.findIndex(color => color === usedColor);
      if (index !== -1) {
        colors.splice(index, 1);
      } 
    }
    return colors;
  }

  private getAllColors(): ColorType[] {
    return allColorValues;
  }

  private async getUsedColors(): Promise<ColorType[]> {
    const projects = await this.uow.projectRepository.getAll();
    return projects.map(project => project.color);
  }

  public async generate(): Promise<ColorType> {
    const colors = await this.available();
    return colors[0];
  }
}
