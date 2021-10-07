import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  data: { topic: string, notes: string[]}[] = [];

  noteForm = this.formBuilder.group({
    topic: undefined,
    description: undefined
  });

  constructor(private readonly formBuilder: FormBuilder, private router: Router)
  { }
  
  ngOnInit(): void { 
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.focusOnMain);
  }

  get topics(): string[] {
    return this.data.map(item => item.topic);
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
      vals.notes.push(description);  
    } else {
      this.data.push({ topic: topic, notes: [description]});
    }
    
    this.focusOnMain();
  }

  focusOnMain() {
    const mainHeader = document.querySelector('#topic-choice') as HTMLElement;
    if (mainHeader) {
      mainHeader.focus();
    }
  }
}
