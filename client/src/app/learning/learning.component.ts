import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  topic?: string = undefined;
  description?: string = undefined;
  data: { topic: string, notes: string[]}[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  get topics(): string[] {
    return this.data.map(item => item.topic);
  }

  add(): void {
    let key = this.topic;
    let value = this.description;
    console.log(key, value); 
    if (!key || !value)
      return;

    let vals = this.data.find(item => item.topic === key);
    if (vals) {
      vals.notes.push(value);  
    } else {
      this.data.push({ topic: key, notes: [value]});
    } 

    this.clearFields();
  }

  clearFields(): void {
    this.topic = undefined;
    this.description = undefined;
  }
}
