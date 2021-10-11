import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HourNote, HourNoteDto } from '../hour-notes';
import { HoursNoteService } from '../hours-note.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {

  notes: HourNote[] = [];

  constructor(
    private service: HoursNoteService,
    private formBuilder: FormBuilder, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);

    this.service.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  noteForm = this.formBuilder.group({
    description: undefined,
    date: new Date().toISOString(),
    estimate: undefined
  });

  onSubmit(): void {
    let { description, date, estimate } = this.noteForm.value;
    if (this.validate(description, date)) {
      this.add(description!, date!, estimate!);
      this.noteForm.reset();
      this.focusOnMain();
    }
  }

  public validate(description ?: string, date ?:Date): boolean {
    return !!description
      && description.length > 0
      && !!date;
  }

  add(description: string, date: Date, estimate ?: number): void {
    let note = this.notes.find(note => note.date === date);
    if (note) {
      note.addDetail(description, estimate);
      this.service.updateNote(note);
    } else {
      let newNote = new HourNote(date, description, estimate);
      this.service.addNote(newNote)
        .subscribe(note => {
          newNote.href = note.href;
          newNote.rel = note.rel;
          this.notes.push(newNote);
        });
    }
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#add-note-form > input[type="text"]') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}

