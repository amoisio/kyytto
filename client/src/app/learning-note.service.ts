import { Injectable } from '@angular/core';
import { LearningNote } from './learning-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root'
})
export class LearningNoteService {
  private _notes: LearningNote[] = [];
  private readonly _store: LocalStore = new LocalStore("learning")
  
  public load() {
    const items = this._store.get();
    this._notes = [];
    items.map(item => this._notes.push(new LearningNote().deserialize(item)));
  }

  get notes(): LearningNote[] {
    return this._notes;
  }

  get topics(): string[] {
    return this._notes
      .map(note => note.topic)
      .sort();
  }

  public save() {
    this._store.set(this._notes);
  }
}
