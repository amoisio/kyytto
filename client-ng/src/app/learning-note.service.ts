import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LearningNote, LearningNoteDto, LearningNotesDto } from './learning-note';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root',
})
export class LearningNoteService {
  constructor(private readonly http: HttpClient) { }

  private hoursUrl = "http://localhost:8080/learning/";

  public getNotes(): Observable<LearningNote[]> {
    return this.http.get<LearningNotesDto>(this.hoursUrl)
      .pipe(
        map(notesDto => notesDto.notes.map(dto => new LearningNote().init(dto)))
      );
  }

  public addNote(note: LearningNote): Observable<LearningNote> {
    const dto = new LearningNoteDto(note);
    return this.http.post<LearningNoteDto>(this.hoursUrl, dto, this.httpOptions)
      .pipe(
        map(noteDto => new LearningNote().init(noteDto))
      );
  }

  public updateNote(note: LearningNote): Observable<LearningNote> {
    const dto = new LearningNoteDto(note);
    return this.http.put<LearningNoteDto>(this.hoursUrl, dto, this.httpOptions)
      .pipe(
        map(noteDto => new LearningNote().init(noteDto))
      )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}