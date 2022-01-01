export const isEmpty = (val: string): boolean => {
  return val === undefined || val === null || val.trim().length === 0;
}