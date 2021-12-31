export interface Color {
  value: string;
  error?: string;
  validate(): boolean;
}

export const colorBuilder = (hexValue: string): Color => new HexColor(hexValue);

class HexColor implements Color {
  public readonly value: string;
  private errorMessage?: string;
  private readonly pattern: RegExp = new RegExp('^#(?:[A-Fa-f0-9]{2}){3}$');

  constructor(hexValue: string) {
    if (!hexValue.startsWith('#')) {
      hexValue = `#${hexValue}`;
    }
    this.value = hexValue.toLowerCase();
  }

  public get error(): string | undefined {
    return this.errorMessage;
  }

  public validate(): boolean {
    if (!this.pattern.test(this.value)) {
      this.errorMessage = `Color value ${this.value} is invalid.`;
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }
}
