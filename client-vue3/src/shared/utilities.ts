import { NIL } from 'uuid';

export const NEWID = NIL;

export const isNew = (id: string | undefined) : boolean => {
    return id === undefined || id === '0' || id === NEWID;
};

export const isEmpty = (val: string): boolean => {
  return val === undefined || val === null || val.trim().length === 0;
};