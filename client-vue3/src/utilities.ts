import { NIL } from 'uuid';

export const NEWID = NIL;

export const isNew = (id: string | undefined) : boolean => {
    return id === undefined || id === '0' || id === NEWID;
};
