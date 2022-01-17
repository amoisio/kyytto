export type ColorType = string;

const build = (hexValue: string): ColorType => {
  if (!hexValue.startsWith('#')) {
    hexValue = `#${hexValue}`;
  }
  return hexValue.toLowerCase();
};

const isValid = (value: ColorType): boolean => {
  const pattern = new RegExp('^#(?:[A-Fa-f0-9]{2}){3}$');
  return pattern.test(value);
}

export const Color = {
  build,
  isValid
};

