export interface Color {
  value: string;
  validate(): boolean;
}

export const colorBuilder = (hexValue: string): Color => new HexColor(hexValue);

class HexColor implements Color {
  public readonly value: string;
  private readonly pattern: RegExp = new RegExp('^#(?:[A-Fa-f0-9]{2}){3}$');

  constructor(hexValue: string) {
    if (!hexValue.startsWith('#')) {
      hexValue = `#${hexValue}`;
    }
    this.value = hexValue.toLowerCase();
  }

  public validate(): boolean {
    return this.pattern.test(this.value);
  }
}
