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

  private readonly store: LocalStore<LearningNote>;
  data: LearningNote[] = [];

  noteForm = this.formBuilder.group({
    topic: undefined,
    description: undefined
  });

  constructor(private readonly formBuilder: FormBuilder, private router: Router) { 
    this.store = new LocalStore("learning");
  }
  
  ngOnInit(): void { 
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);

    this.data = this.store.get(); 
  }

  get topics(): string[] {
    let tops = this.data.map(item => item.topic!);
    console.log(tops);
    return tops;
  }

  onSubmit(): void {
    let {topic, description} = this.noteForm.value;
    this.add(topic, description);
    this.noteForm.reset();
  }

  add(topic: string, description: string): void {
    console.log(topic, description); 
    if (!topic || !description)
      return;

    let vals = this.data.find(item => item.topic === topic);
    if (vals) {
      vals.details!.push(description);  
    } else {
      this.data.push({ topic: topic, details: [description]});
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
