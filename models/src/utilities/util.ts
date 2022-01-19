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

export const Utilities = {
  isEmpty,
  resolveId
};