import { idBuilder } from 'src/index.js';
import { Identifier } from './identifier.js';

export interface Href {
  base: string; // protocol + hostname
  port: string;
  extension: string;
  segments: string[];
  query: string[][];
  rel: string;
  id: Identifier;
}

export const hrefBuilder = (urlString: string): Href => {
  const url = new URL(urlString);
  const base = `${url.protocol}//${url.hostname}`;
  const port = url.port;
  let extension = '';
  const segments: string[] = [];
  const query: string[][] = [[]];

  if (url.pathname.length > 1) {
    const fragments = url.pathname.split('/');
    for (let i = 0; i < fragments.length - 1; i++) {
      const frag = fragments[i].trim();
      if (frag.length > 0) {
        segments.push(frag);
      }
    }
    const lastfragment = fragments[fragments.length - 1];
    const lastParts = lastfragment.split('.');
    if (lastParts.length === 1) {
      segments.push(lastfragment);
    } else {
      extension = `.${lastParts[1]}`;
      segments.push(lastParts[0]);
    }
  }

  if (url.search.startsWith('?')) {
    const s = url.search.substring(1);
    const pairs = s.split('&');
    for (let i = 0; i < pairs.length; i++) {
      const kvp = pairs[i].split('=');
      const key = kvp[0];
      const val = kvp.length > 1 ? kvp[1] : '';
      query.push([key, val]);
    }
  }

  let rel = '/';
  if (segments.length > 0) {
    rel += segments.join('/');
  }
  if (extension.length > 0) {
    rel += extension;
  }

  return {
    base: base,
    port: port,
    extension: extension,
    segments: segments,
    query: query,
    rel: rel,
    id: idBuilder(segments[segments.length - 1])
  };
};



