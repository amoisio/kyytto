/**
 * Hex color
 */
export class Color extends String {
  public errorMessage?: string;
  private readonly pattern: RegExp = new RegExp('^#(?:[A-Fa-f0-9]{2}){3}$');

  constructor(hexValue: string) {
    super(hexValue);
  }

  public validate(): boolean {
    if (this === undefined || this === null || this.valueOf() === undefined || this.valueOf() === null) {
      this.errorMessage = 'Color is undefined';
      return false;
    }

    if (!this.pattern.test(this.valueOf())) {
      this.errorMessage = `Color value ${this} is invalid.`;
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }
}
