import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import { LearningNote } from '../learning-note';
import { LocalStore } from '../local-store';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
  public notes: LearningNote[] = [];
  private store: LocalStore<LearningNote> = new LocalStore<LearningNote>("learning");

  constructor(private readonly formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);

    this.notes = this.store.get();
  }

  noteForm = this.formBuilder.group({
    topic: undefined,
    detail: undefined
  });

  onSubmit(): void {
    let { topic, detail } = this.noteForm.value;
    if (this.validate(topic, detail)) {
      this.add(topic!, detail!);
      this.noteForm.reset();
    }
  }

  private validate(topic ?: string, detail ?: string): boolean {
    return !!topic
      && !!detail
      && topic.length > 0
      && detail.length > 0;
  }

  add(topic: string, detail: string): void {
    let note = this.notes.find(note => note.topic === topic);
    if (note) {
      note.details!.push(detail);  
    } else {
      this.notes.push({ topic: topic, details: [detail]});
    }
    this.store.set(this.notes);
    this.focusOnMain();
  }

  get topics(): string[] {
    return this.notes
      .map(note => note.topic!)
      .sort();
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#add-note-form > input') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}
