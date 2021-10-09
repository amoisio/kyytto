import { Injectable } from '@angular/core';
import { TodoNote } from './todo-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root'
})
export class TodoNoteService {
  private _notes: TodoNote[] = [];
  private readonly _store: LocalStore = new LocalStore("todos")

  public load() {
    const items = this._store.get();
    this._notes = [];
    items.map(item => this._notes.push(new TodoNote().deserialize(item)));
  }

  get notes(): TodoNote[] {
    return this._notes;
  }

  public save() {
    this._store.set(this._notes);
  }
}
