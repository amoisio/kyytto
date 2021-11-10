import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HourNote, HourNoteDto, HourNotesDto } from './hour-notes';
import { LocalStore } from './local-store';

@Injectable({
  providedIn: 'root',
})
export class HoursNoteService {
  constructor(private readonly http: HttpClient) { }

  private hoursUrl = "http://localhost:8080/hours/";

  public getNotes(): Observable<HourNote[]> {
    return this.http.get<HourNotesDto>(this.hoursUrl)
      .pipe(
        map(notesDto => notesDto.notes.map(dto => new HourNote(dto.date).init(dto)))
      );
  }

  public addNote(note: HourNote): Observable<HourNote> {
    const dto = new HourNoteDto(note);
    return this.http.post<HourNoteDto>(this.hoursUrl, dto, this.httpOptions)
      .pipe(
        map(noteDto => new HourNote(noteDto.date).init(noteDto))
      );
  }

  public updateNote(note: HourNote): Observable<HourNote> {
    const dto = new HourNoteDto(note);
    return this.http.put<HourNoteDto>(this.hoursUrl, dto, this.httpOptions)
      .pipe(
        map(noteDto => new HourNote(noteDto.date).init(noteDto))
      )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
