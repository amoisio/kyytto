import { hrefBuilder  } from './href.js';

test('test', async () => {
  const h = hrefBuilder('http://localhost');

  expect(h).toBeTruthy();
});
