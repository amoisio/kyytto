import { Color } from 'kyytto-models';
import UnitOfWork from '../storage/unit-of-work.js';

const allColorValues = [
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
  all(): Color[];
  available(): Promise<Color[]>;
  generate(): Promise<Color>;
}

export class NextUnusedColorGenerator implements ColorGenerator {
  constructor(private readonly uow: UnitOfWork) { }

  public all(): Color[] {
    return this.getAllColors();
  }

  public async available(): Promise<Color[]> {
    const colors = this.getAllColors();
    const usedColors = await this.getUsedColors();
    for (let usedColor of usedColors) {
      const index = colors.findIndex(color => color.toString() === usedColor.toString());
      if (index !== -1) {
        colors.splice(index, 1);
      } 
    }
    return colors;
  }

  private getAllColors(): Color[] {
    return allColorValues.map(color => new Color(color));
  }

  private async getUsedColors(): Promise<Color[]> {
    const projects = await this.uow.projectRepository.getAll();
    return projects.map(project => project.color);
  }

  public async generate(): Promise<Color> {
    const colors = await this.available();
    return colors[0];
  }
}
