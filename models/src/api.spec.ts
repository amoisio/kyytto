import { hrefBuilder } from './models/href.js';
import { Api, apiBuilder } from './api.js';

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
    expect(id.value).toBe('783d4356-c26f-4a9e-a4b0-905d73ca5edc');
  });

  test('resolveId throws an error if called with a url without an id', () => {
    expect(() => api.resolveId('http://mydomain:9000/api/tasks')).toThrow();
  });

  test('resolveId throws an error if called with an Href without an id', () => {
    const href = hrefBuilder('http://mydomain:9000/api/tasks');
    expect(() => api.resolveId(href)).toThrow();
  });

  test('resolveHref for menu resolves the correct path', () => {
    const href = api.menu.resolveHref();
    expect(href).toBe(`http://mydomain:9000${api.menu.path}`);
  });

  test('resolveHref for tasks resolves the correct path', () => {
    const href = api.tasks.resolveHref('52289d13-d597-4010-a78f-f3fa0690bd6d');
    expect(href).toBe(`http://mydomain:9000${api.tasks.path}/52289d13-d597-4010-a78f-f3fa0690bd6d`);
  });

  test('resolveHref for projects resolves the correct path', () => {
    const href = api.projects.resolveHref('52289d13-d597-4010-a78f-f3fa0690bd6d');
    expect(href).toBe(`http://mydomain:9000${api.projects.path}/52289d13-d597-4010-a78f-f3fa0690bd6d`);
  });
});
