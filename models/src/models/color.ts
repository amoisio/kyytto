/**
 * Hex color
 */
export class Color {
  public readonly value: string;
  public errorMessage?: string;
  private readonly pattern: RegExp = new RegExp('^#(?:[A-Fa-f0-9]{2}){3}$');

  constructor(hexValue: string) {
    this.value = hexValue;
  }

  public validate(): boolean {
    if (this.value === undefined || this.value === null) {
      this.errorMessage = 'Color is undefined';
      return false;
    }

    if (!this.pattern.test(this.value)) {
      this.errorMessage = `Color value ${this.value} is invalid.`;
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  public toString(): string {
    return this.value;
  }
}
