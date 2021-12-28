import { Identifier } from '../utilities/identifier-generator.js';

/**
 * Represents a type whose instances as uniquely identifiable.
 */
export default interface Identifiable {
  id: Identifier;
}