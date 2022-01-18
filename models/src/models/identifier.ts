import { NIL, v4 as uuidv4, validate } from 'uuid';

export type IdentifierType = string;

/**
 * Build an Identifier from a string. 
 * @param value id.
 */
const build = (value: string): IdentifierType => {
  return value;
}

/**
 * Parse an Identifier from an href string.
 * Returns undefined if Identiier cannot be parsed from href.
 * @param href resource href.
 */
const parse = (href: string): IdentifierType | undefined => {
  try {
    const h = hrefParser(href);
    return h.id !== undefined
      ? build(h.id)
      : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Create an Identifier with a newly generated uuid.
 * @returns a new identifier value.
 */
const newId = (): IdentifierType => uuidv4();

/**
 * Check if value is an empty identifier value.
 * @param value identifier
 * @returns true if value is empty identifier.
 */
const isNil = (value: IdentifierType): boolean => value === NIL;

/**
 * Check if value is a valid identifier.
 * @param value identifier
 * @returns true if value is a valid identifier.
 */
const isValid = (value: IdentifierType): boolean => validate(value);

export const Identifier = {
  build,
  parse,
  generateNew: newId,
  nil: NIL,
  isNil,
  isValid
};

interface Href {
  base: string; // protocol + hostname
  port: string;
  extension?: string;
  segments: string[];
  query: string[][];
  rel: string;
  id?: IdentifierType;
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
    if (Identifier.isValid(lastSegment)) {
      id = Identifier.build(lastSegment);
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
