import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import { LearningNote } from '../learning-note';
import { LearningNoteService } from '../learning-note.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  notes: LearningNote[] = [];

  constructor(
    private service: LearningNoteService,
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

  get topics(): string[] {
    return this.notes
      .map(note => note.topic)
      .sort();
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
      this.focusOnMain();
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
      note.details.push(detail);  
      this.service.updateNote(note);
    } else {
      let newNote = new LearningNote();
      newNote.topic = topic;
      newNote.details.push(detail);
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
