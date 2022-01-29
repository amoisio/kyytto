import { Identifiable } from '../models/identifiable.js';
import { Identifier, IdentifierType } from '../models/identifier.js';
import { ResourceReference } from '../models/resource.js';

const isEmpty = (val: string | undefined): boolean => {
  return val === undefined || val === null || val.trim().length === 0;
};

/**
 * Resolves the id of the given href.
 * Example,
 *  href = http://domain:port/api/resource/123
 *  returns 123
 *
 * @param href resource href.
 */
const resolveId = (href: ResourceReference): IdentifierType => {
  const id = Identifier.parse(href);
  if (id === undefined) {
    throw new Error(`Unable to resolve id from ${href}.`);
  }
  return id;
} 

const matchExact = <T extends Identifiable>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return matchAll(arr1, arr2);
}

const matchAny = <T extends Identifiable>(arr1: T[], arr2: T[]): boolean => {
  const ids1 = arr1.map(item1 => item1.id);
  const ids2 = arr2.map(item2 => item2.id);
  return ids1.some(id => ids2.includes(id));
}

const matchAll = <T extends Identifiable>(arr1: T[], arr2: T[]): boolean => {
  const ids1 = arr1.map(item1 => item1.id);
  const ids2 = arr2.map(item2 => item2.id);
  return ids1.every(id => ids2.includes(id));
}

export const Utilities = {
  isEmpty,
  resolveId,
  matchExact,
  matchAny,
  matchAll
};

