import UnitOfWork from '../storage/unit-of-work.js';

export class Color extends String {
  public readonly used: boolean;
  constructor(value: string, used: boolean) { 
      if (!value.startsWith('#')) {
        value = `#${value}`;
      }
      super(value);
      this.used = used;
  }
  public validate(): boolean {
    // TODO: Add color validation
    return true;
  }
}

const allColorValues = [
  '005f73',
  '0a9396',
  '94d2bd',
  'e9d8a6',
  'ee9b00',
  'ca6702',
  'bb3e03',
  'ae2012',
  '9b2226'
];

export interface ColorGenerator {
  all(): Promise<Color[]>;
  available(): Promise<Color[]>;
  generate(): Promise<Color>;
}

export class NextUnusedColorGenerator implements ColorGenerator {
  constructor(private readonly uow: UnitOfWork) { }

  public async all(): Promise<Color[]> {
    return await this.getColors();
  }

  public async available(): Promise<Color[]> {
    return await this.getColors(color => !color.used);
  }

  private async getColors(filter ?: (color: Color) => boolean): Promise<Color[]> {
    const colors = new Array<Color>();
    const usedColors = await this.getUsedColors();
    for (let colorValue of allColorValues) {
      const usedColor = usedColors.find(color => color.valueOf() === colorValue);
      if (usedColor === undefined) {
        colors.push(new Color(colorValue, false));
      } else {
        colors.push(usedColor);
      }
    }
    return filter === undefined
      ? colors
      : colors.filter(filter);
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
