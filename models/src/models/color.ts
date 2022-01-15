import { Validatable } from './validatable.js';

export interface Color extends Validatable {
  value: string;
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

  public isValid(): boolean {
      return this.validationErrors().length === 0;
  }

  public validationErrors(): string[] {
    return (this.pattern.test(this.value)) 
    ? []
    : [`${this.value} is not a valid RGB value.`];
  }
}
