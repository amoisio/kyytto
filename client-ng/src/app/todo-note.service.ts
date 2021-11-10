import { Injectable } from '@angular/core';
import { TodoNote, TodoNoteDto, TodoNotesDto } from './todo-note';
import { LocalStore } from './local-store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoNoteService {
  constructor(private readonly http: HttpClient) { }

  private hoursUrl = "http://localhost:8080/todos/";

  public getNotes(): Observable<TodoNote[]> {
    return this.http.get<TodoNotesDto>(this.hoursUrl)
      .pipe(
        map(notesDto => notesDto.notes.map(dto => new TodoNote().init(dto)))
      );
  }

  public addNote(note: TodoNote): Observable<TodoNote> {
    const dto = new TodoNoteDto(note);
    return this.http.post<TodoNoteDto>(this.hoursUrl, dto, this.httpOptions)
      .pipe(
        map(noteDto => new TodoNote().init(noteDto))
      );
  }

  public updateNote(note: TodoNote): Observable<TodoNote> {
    const dto = new TodoNoteDto(note);
    return this.http.put<TodoNoteDto>(this.hoursUrl, dto, this.httpOptions)
      .pipe(
        map(noteDto => new TodoNote().init(noteDto))
      )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
