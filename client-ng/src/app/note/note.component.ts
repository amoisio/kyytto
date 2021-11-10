import { LocalStore } from '../local-store';

export abstract class NoteComponent<T> {
  public notes: T[] = [];

  constructor(public readonly store: LocalStore<T>) {}
}
