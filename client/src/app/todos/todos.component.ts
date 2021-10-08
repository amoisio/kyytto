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

  private readonly store: LocalStore<TodoNote>;
  data: TodoNote[] = [];

  noteForm = this.formBuilder.group({
    topic: undefined
  });

  constructor(private readonly formBuilder: FormBuilder, private router: Router) {
    this.store = new LocalStore("todos");
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);

    this.data = this.store.get();
  }

  onSubmit(): void {
    let { topic } = this.noteForm.value;
    this.add(topic);
    this.noteForm.reset();
  }

  add(topic: string): void {
    console.log(topic);
    if (!topic)
      return;

    let vals = this.data.find(item => item.topic === topic);
    if (!vals) {
      this.data.push({ topic: topic, done: false });
    }

    this.store.set(this.data);
    this.focusOnMain();
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#add-note-form > input') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}



