import { Injectable } from '@angular/core';
import { TodoNote } from './todo-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root'
})
export class TodoNoteService {
  private readonly _notes: TodoNote[] = [];

  constructor(
    private store: LocalStore = new LocalStore("todos")) {
  }

  public load() {
    const items = this.store.get();
    items.map(item => this._notes.push(new TodoNote().deserialize(item)));
  }

  get notes(): TodoNote[] {
    return this._notes;
  }

  public save() {
    this.store.set(this._notes);
  }
}
