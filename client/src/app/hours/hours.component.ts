import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HourItem, HoursNote } from '../hours-note';
import { HoursNoteService } from '../hours-note.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {
  constructor(
    private service: HoursNoteService,
    private formBuilder: FormBuilder, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);

    this.service.load();
  }

  get notes(): HoursNote[] {
    return this.service.notes;
  }

  noteForm = this.formBuilder.group({
    description: undefined,
    date: new Date(Date.now()),
    estimate: undefined
  });

  onSubmit(): void {
    let { description, date, estimate } = this.noteForm.value;
    if (this.validate(description, date)) {
      this.add(description!, date!, estimate!);
      this.noteForm.reset();
    }
  }

  public validate(description ?: string, date ?:Date): boolean {
    return !!description
      && description.length > 0
      && !!date;
  }

  add(description: string, date: Date, estimate ?: number): void {
    let note = this.notes.find(note => note.date === date);
    let line = new HourItem();
    line.description = description;
    line.estimate = estimate;
    if (note) {
      note.details!.push(line);
    } else {
      let newNote = new HoursNote();
      newNote.date = date;
      newNote.details.push(line);
      this.notes.push(newNote);
    }
    this.service.save();
    this.focusOnMain();
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#add-note-form > input') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}

