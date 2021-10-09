import { Injectable } from '@angular/core';
import { HoursNote } from './hours-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root'
})
export class HoursNoteService {
  private _notes: HoursNote[] = [];
  private readonly _store: LocalStore = new LocalStore("hours")

  public load() {
    const items = this._store.get();
    this._notes = [];
    items.map(item => this._notes.push(new HoursNote().deserialize(item)));
  }

  get notes(): HoursNote[] {
    return this._notes;
  }

  public save() {
    this._store.set(this._notes);
  }
}
