const isEmpty = (val: string | undefined): boolean => {
  return val === undefined || val === null || val.trim().length === 0;
};

export const Utilities = {
  isEmpty
};