import { Api, apiBuilder } from './api.js';
import { Identifier } from './models/identifier.js';

describe('apiBuilder', () => {
  test('builds an api map with the given baseUrl', () => {
    const api = apiBuilder('http://mydomain:9000');
    expect(api.baseUrl).toBe('http://mydomain:9000');
  });
});


describe('api', () => {
  let api: Api;
  beforeEach(() => {
    api = apiBuilder('http://mydomain:9000');
  });

  test('resolveId succesfully resolves an id from a valid url and id', () => {
    const id = api.resolveId('http://mydomain:9000/api/tasks/783d4356-c26f-4a9e-a4b0-905d73ca5edc');
    expect(id).toBe('783d4356-c26f-4a9e-a4b0-905d73ca5edc');
  });

  test('resolveId resolves an invalid Identifier if called with a url without an id', () => {
    const id = api.resolveId('http://mydomain:9000/api/tasks')
    expect(id).toBeFalsy();
  });

  test('resolveHref for menu resolves the correct path', () => {
    const href = api.menu.resolveHref();
    expect(href).toBe(`http://mydomain:9000${api.menu.path}`);
  });

  test('resolveHref for tasks resolves the correct path', () => {
    const id = Identifier.build('52289d13-d597-4010-a78f-f3fa0690bd6d');
    const href = api.tasks.resolveHref(id);
    expect(href).toBe(`http://mydomain:9000${api.tasks.path}/52289d13-d597-4010-a78f-f3fa0690bd6d`);
  });

  test('resolveHref for projects resolves the correct path', () => {
    const id = Identifier.build('52289d13-d597-4010-a78f-f3fa0690bd6d');
    const href = api.projects.resolveHref(id);
    expect(href).toBe(`http://mydomain:9000${api.projects.path}/52289d13-d597-4010-a78f-f3fa0690bd6d`);
  });
});
