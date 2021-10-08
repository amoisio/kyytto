import { Injectable } from '@angular/core';
import { INote } from './inote';
import { LearningNote } from './learning-note';

@Injectable({
  providedIn: 'root'
})
export class NoteService<T extends INote> {

  constructor() { 


  }

  public learningNotes(): LearningNote[] {

  }

  public save
}
