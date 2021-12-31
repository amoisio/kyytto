import { idBuilder, newId } from './identifier.js';
import { validate, v4 as uuidv4 } from 'uuid';

describe('idBuilder', () => {
  test('builds a new Identifier object with a valid uuid', () => {
    const id = idBuilder(uuidv4());

    expect(id).toBeDefined();
    expect(id.validate()).toBeTruthy();
    expect(validate(id.value)).toBeTruthy();
  });

  test('builds a new Identifier object with an invalid uuid', () => {
    const id = idBuilder('teppo');

    expect(id).toBeDefined();
    expect(id.validate()).toBeFalsy();
    expect(validate(id.value)).toBeFalsy();
    expect(id.value).toBe('teppo');
  });
});

describe('newId', () => {
  test('builds a new Identifier object with a valid uuid', () => {
    const id = newId();

    expect(id).toBeDefined();
    expect(id.validate()).toBeTruthy();
    expect(validate(id.value)).toBeTruthy();
  })
});

