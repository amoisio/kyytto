import { hrefBuilder } from './href.js';

describe('hrefBuilder', () => {
  test('extracts protocol and hostname in .base', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.base).toBe('https://mydomain.myserver.com');
  });

  test('extracts port in .port', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.port).toBe('8090');
  });

  test('extracts port in .port and defaults to 80 if not in url', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.port).toBe('80')
  });

  test('extracts extension in .extension', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f.json');
    expect(href.extension).toBe('.json');
  });

  test('extracts undefined in .extension if there is no extension in url', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.extension).toBeUndefined();
  });

  test('extracts path segments in .segments', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.segments).toContain('api');
    expect(href.segments).toContain('tasks');
    expect(href.segments).toContain('d0475dab-b9a8-499e-ab26-177943a4414f');
  });

  test('extracts an empty array in .segments if no path is in url', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090');
    expect(href.segments).toBeDefined();
    expect(href.segments.length).toBe(0);
  });

  test('extract relative path in .rel', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.rel).toBe('/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
  });

  test('extract / in .rel if no path is in url', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090');
    expect(href.rel).toBe('/');
  });

  test('extract id in .id', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks/d0475dab-b9a8-499e-ab26-177943a4414f');
    expect(href.id).toBeDefined();
    expect(href.id!.value).toBe('d0475dab-b9a8-499e-ab26-177943a4414f');
  });

  test('extract undefined in .id if no id is in url', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks');
    expect(href.id).toBeUndefined();
  });

  test('extract query pairs in .query', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks?name=teppo&age=30');
    expect(href.query).toBeDefined();
    expect(href.query.length).toBe(2);
    expect(href.query[0][0]).toBe('name');
    expect(href.query[0][1]).toBe('teppo');
    expect(href.query[1][0]).toBe('age');
    expect(href.query[1][1]).toBe('30');
  });

  test('extract an empty array in .query if none are given in url', async () => {
    const href = hrefBuilder('https://mydomain.myserver.com:8090/api/tasks');
    expect(href.query).toBeDefined();
    expect(href.query.length).toBe(0);
  });
});
