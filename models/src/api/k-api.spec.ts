import { api } from '../api/k-api.js';
import { Identifier } from '../models/identifier.js';
import { Utilities } from '../utilities/util.js';

describe('K Api', () => {
  let baseUrl = 'http://mydomain:9000';

  test('root is /', () => {
    expect(api.path).toBe('/');
  });

  test('resolves to host url', () => {
    expect(api.resolve(baseUrl)).toBe(`${baseUrl}/`);
  });

  test('menu path is /api/menu', () => {
    expect(api.menu.path).toBe('/api/menu');
  });

  test('menu resolves to menu url', () => {
    expect(api.menu.resolve(baseUrl)).toBe(`${baseUrl}/api/menu`);
  });

  test('projects path is /api/projects', () => {
    expect(api.projects.path).toBe('/api/projects');
  });

  test('projects resolves to projects url', () => {
    expect(api.projects.resolve(baseUrl)).toBe(`${baseUrl}/api/projects`);
  });

  test('projects with id resolves to projects by id url', () => {
    expect(api.projects.byId.resolve(baseUrl, '123')).toBe(`${baseUrl}/api/projects/123`);
  });

  test('stacks path is /api/stacks', () => {
    expect(api.stacks.path).toBe('/api/stacks');
  });

  test('stacks resolves to stacks url', () => {
    expect(api.stacks.resolve(baseUrl)).toBe(`${baseUrl}/api/stacks`);
  });

  test('stacks with id resolves to stacks by id url', () => {
    expect(api.stacks.byId.resolve(baseUrl, 'abdffa-ae1-fafa-313')).toBe(`${baseUrl}/api/stacks/abdffa-ae1-fafa-313`);
  });

  test('tags path is /api/tags', () => {
    expect(api.tags.path).toBe('/api/tags');
  });

  test('tags resolves to tags url', () => {
    expect(api.tags.resolve(baseUrl)).toBe(`${baseUrl}/api/tags`);
  });

  test('tags with id resolves to tags by id url', () => {
    expect(api.tags.byId.resolve(baseUrl, 'abdffa-ae1-fafa-313')).toBe(`${baseUrl}/api/tags/abdffa-ae1-fafa-313`);
  });


  test('tasks path is /api/tasks', () => {
    expect(api.tasks.path).toBe('/api/tasks');
  });

  test('tasks resolves to tasks url', () => {
    expect(api.tasks.resolve(baseUrl)).toBe(`${baseUrl}/api/tasks`);
  });

  test('tasks with id resolves to tasks by id url', () => {
    expect(api.tasks.byId.resolve(baseUrl, 'abdffa-ae1-fafa-313')).toBe(`${baseUrl}/api/tasks/abdffa-ae1-fafa-313`);
  });

  test('users path is /api/users', () => {
    expect(api.users.path).toBe('/api/users');
  });

  test('users resolves to users url', () => {
    expect(api.users.resolve(baseUrl)).toBe(`${baseUrl}/api/users`);
  });

  test('users with id resolves to users by id url', () => {
    expect(api.users.byId.resolve(baseUrl, 'abdffa-ae1-fafa-313')).toBe(`${baseUrl}/api/users/abdffa-ae1-fafa-313`);
  });


});
