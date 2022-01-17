import { Color } from './color.js';

describe('colorBuilder', () => {
  test('builds a new Color object with a valid hex value', () => {
    const color = Color.build('#131313');

    expect(color).toBeDefined();
    expect(Color.isValid(color)).toBeTruthy();
    expect(color).toBe('#131313');
  });

  test('builds a new Color object with a valid hex value without #', () => {
    const color = Color.build('AFAFAF');

    expect(color).toBeDefined();
    expect(Color.isValid(color)).toBeTruthy();
    expect(color).toBe('#afafaf');
  });

  test('builds a new Color object with an invalid', () => {
    const color = Color.build('teppo');

    expect(color).toBeDefined();
    expect(Color.isValid(color)).toBeFalsy();
    expect(color).toBe('#teppo');
  });
});
