import { colorBuilder, Color } from './color.js';

describe('colorBuilder', () => {
  test('builds a new Color object with a valid hex value', () => {
    const color = colorBuilder('#131313');

    expect(color).toBeDefined();
    expect(color.isValid()).toBeTruthy();
    expect(color.value).toBe('#131313');
  });

  test('builds a new Color object with a valid hex value without #', () => {
    const color = colorBuilder('AFAFAF');

    expect(color).toBeDefined();
    expect(color.isValid()).toBeTruthy();
    expect(color.value).toBe('#afafaf');
  });

  test('builds a new Color object with an invalid', () => {
    const color = colorBuilder('teppo');

    expect(color).toBeDefined();
    expect(color.isValid()).toBeFalsy();
    expect(color.value).toBe('#teppo');
  });
});
