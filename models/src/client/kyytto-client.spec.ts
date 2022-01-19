import { Api } from '../api/api.js';
import { Identifier } from '../models/identifier.js';
import { Utilities } from '../utilities/util.js';
import { KyyttoClient } from './kyytto-client.js';

describe('Kyytto client', () => {
  let client: KyyttoClient;
  beforeEach(() => {
    client = new KyyttoClient('http://mydomain:9000');
  });

  test('builds an api map with the given baseUrl', () => {
    expect(client.baseUrl).toBe('http://mydomain:9000');
  });

  test('resolveId succesfully resolves an id from a valid url and id', () => {
    const id = Utilities.resolveId('http://mydomain:9000/api/tasks/783d4356-c26f-4a9e-a4b0-905d73ca5edc');
    expect(id).toBe('783d4356-c26f-4a9e-a4b0-905d73ca5edc');
  });

  test('resolveId resolves an invalid Identifier if called with a url without an id', () => {
    expect(() => Utilities.resolveId('http://mydomain:9000/api/tasks')).toThrow();
  });

  test('resolveHref for menu resolves the correct path', () => {
    const href = client.menu.resourceHref();
    expect(href).toBe(`http://mydomain:9000${client.menu.path}`);
  });

  test('resolveHref for tasks resolves the correct path', () => {
    const id = Identifier.build('52289d13-d597-4010-a78f-f3fa0690bd6d');
    const href = client.tasks.resolveHref(id);
    expect(href).toBe(`http://mydomain:9000${client.tasks.path}/52289d13-d597-4010-a78f-f3fa0690bd6d`);
  });

  test('resolveHref for projects resolves the correct path', () => {
    const id = Identifier.build('52289d13-d597-4010-a78f-f3fa0690bd6d');
    const href = client.projects.resolveHref(id);
    expect(href).toBe(`http://mydomain:9000${client.projects.path}/52289d13-d597-4010-a78f-f3fa0690bd6d`);
  });
});
