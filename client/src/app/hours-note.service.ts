import { Injectable } from '@angular/core';
import { HoursNote } from './hours-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root'
})
export class HoursNoteService {
  private readonly _notes: HoursNote[] = [];

  constructor(
    private store: LocalStore = new LocalStore("hours")) {
  }

  public load() {
    const items = this.store.get();
    items.map(item => this._notes.push(new HoursNote().deserialize(item)));
  }

  get notes(): HoursNote[] {
    return this._notes;
  }

  public save() {
    this.store.set(this._notes);
  }
}
