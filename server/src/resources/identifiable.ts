import { Identifier } from 'kyytto-models';

/**
 * Represents a type whose instances as uniquely identifiable.
 */
export default interface Identifiable {
  id: Identifier;
}