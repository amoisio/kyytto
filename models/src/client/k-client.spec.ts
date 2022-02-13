import { KClient } from './k-client.js';

describe('Kyytto client', () => {
  const baseUrl: string = 'http://mydomain:9000';
  const client: KClient = new KClient(baseUrl);

  test('builds a client with the given baseUrl', () => {
    expect(client.baseUrl).toBe('http://mydomain:9000');
  });
});
