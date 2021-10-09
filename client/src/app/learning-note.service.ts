import { Injectable } from '@angular/core';
import { LearningNote } from './learning-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root'
})
export class LearningNoteService {
  private readonly _notes: LearningNote[] = [];
  
  constructor(
    private store: LocalStore = new LocalStore("learning")) { 
  }
  
  public load() {
    const items = this.store.get();
    items.map(item => this._notes.push(new LearningNote().deserialize(item)));
  }

  get notes(): LearningNote[] {
    return this._notes;
  }

  public save() {
    this.store.set(this._notes);
  }
}
