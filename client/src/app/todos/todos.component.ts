import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TodoNote } from '../todo-note';
import { LocalStore } from '../local-store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public notes: TodoNote[] = [];
  private store: LocalStore<TodoNote> = new LocalStore<TodoNote>("todos");

  constructor(private readonly formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);

    this.notes = this.store.get();
  }

  noteForm = this.formBuilder.group({
    description: undefined
  });

  onSubmit(): void {
    let { description } = this.noteForm.value;
    if (this.validate(description)) {
      this.add(description!);
      this.noteForm.reset();
    }
  }

  public validate(description ?: string): boolean {
    return !!description
      && description.length > 0;
  }

  add(description: string): void {
    let note = this.notes.find(note => note.description === description);
    if (!note) {
      this.notes.push({ description: description, done: false });
    }
    this.store.set(this.notes);
    this.focusOnMain();
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#add-note-form > input') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}