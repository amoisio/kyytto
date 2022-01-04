import { NIL, v4 as uuidv4, validate } from 'uuid';

export interface Identifier {
  value: string;
  validate(): boolean;
  isNil(): boolean;
}

/**
 * Build an Identifier from an id string.
 * @param value id.
 */
export const idBuilder = (value: string): Identifier => {
  return new UuidIdentifier(value);
}

/**
 * Parse an Identifier from an href string.
 * @param href resource href.
 */
export const idParser = (href: string): Identifier => {
  try {
    const h = hrefParser(href);
    return new UuidIdentifier(h.id?.value ?? '');
  } catch {
    return new UuidIdentifier('');
  }
}

/**
 * Create an Identifier with a newly generated uuid.
 * @returns 
 */
export const newId = (): Identifier => new UuidIdentifier(uuidv4());

class UuidIdentifier implements Identifier {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public validate(): boolean {
    return validate(this.value);
  }

  public isNil(): boolean {
    return this.value === NIL;
  }
}

interface Href {
  base: string; // protocol + hostname
  port: string;
  extension?: string;
  segments: string[];
  query: string[][];
  rel: string;
  id?: Identifier;
}

const hrefParser = (href: string): Href => {
  const url = new URL(href);
  const base = `${url.protocol}//${url.hostname}`;
  const port = url.port === '' ? '80' : url.port;
  let extension: string | undefined = undefined;
  const segments: string[] = [];
  const query: string[][] = [];

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
  let id = undefined;
  if (segments.length > 0) {
    rel += segments.join('/');
    const lastSegment = segments[segments.length - 1];
    if (validate(lastSegment)) {
      id = idBuilder(lastSegment);
    }
  }

  if (!!extension && extension.length > 0) {
    rel += extension;
  }

  return {
    base: base,
    port: port,
    extension: extension,
    segments: segments,
    query: query,
    rel: rel,
    id: id
  };
};
