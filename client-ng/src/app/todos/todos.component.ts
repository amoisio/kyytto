import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TodoNote } from '../todo-note';
import { TodoNoteService } from '../todo-note.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  notes: TodoNote[] = [];

  constructor(
    private service: TodoNoteService,
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
    description: undefined
  });

  onSubmit(): void {
    let { description } = this.noteForm.value;
    if (this.validate(description)) {
      this.add(description!);
      this.noteForm.reset();
      this.focusOnMain();
    }
  }

  public validate(description ?: string): boolean {
    return !!description
      && description.length > 0;
  }

  add(description: string): void {
    let note = this.notes.find(note => note.description === description);
    if (!note) {
      let newNote = new TodoNote();
      newNote.description = description;
      newNote.done = false;
      this.service.addNote(newNote)
        .subscribe(note => {
          newNote.href = note.href;
          newNote.rel = note.rel;
          this.notes.push(newNote);
        });
    }
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#add-note-form > input') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}