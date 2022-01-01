import { idBuilder, idParser, newId } from './identifier.js';
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

describe('idParser', () => {
  test('parses a valid id from href', async () => {
    const id = idParser('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');

    expect(id).toBeDefined();
    expect(id.value).toBe('d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(id.validate()).toBeTruthy();
  });

  test('parses an invalid id when id is missing from href', async () => {
    const id = idParser('https://mydomain.myserver.com:8090/api/tasks');

    expect(id).toBeDefined();
    expect(id.validate()).toBeFalsy();
  });
});

