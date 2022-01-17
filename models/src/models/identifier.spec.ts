import { Identifier } from './identifier.js';
import { validate, v4 as uuidv4 } from 'uuid';

describe('Id.buildId', () => {
  test('builds a new Identifier object with a valid uuid', () => {
    const id = Identifier.build(uuidv4());

    expect(id).toBeTruthy();
    expect(Identifier.isValid(id!)).toBeTruthy();
  });

  test('builds a new Identifier object with an invalid uuid', () => {
    const id = Identifier.build('teppo');

    expect(id).toBeTruthy();
    expect(Identifier.isValid(id!)).toBeFalsy();
  });
});

describe('newId', () => {
  test('builds a new Identifier object with a valid uuid', () => {
    const id = Identifier.newId();

    expect(id).toBeTruthy();
    expect(Identifier.isValid(id)).toBeTruthy();
  })
});

describe('idParser', () => {
  test('parses a valid id from href', async () => {
    const id = Identifier.parse('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');

    expect(id).toBeTruthy();
    expect(id).toBe('d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(Identifier.isValid(id!)).toBeTruthy();
  });

  test('parses an invalid id when id is missing from href', async () => {
    const id = Identifier.parse('https://mydomain.myserver.com:8090/api/tasks');

    expect(id).toBeFalsy();
  });
});

describe('validation', () => {
  test('should validate f39be201-8bd1-4959-9576-58c38b321adc as ok', () => {
    const id = Identifier.build('f39be201-8bd1-4959-9576-58c38b321adc');

    expect(id).toBeTruthy();
    expect(Identifier.isValid(id!)).toBeTruthy();
  });
});