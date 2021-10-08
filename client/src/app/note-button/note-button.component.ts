import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-button',
  templateUrl: './note-button.component.html',
  styleUrls: ['./note-button.component.scss']
})
export class NoteButtonComponent implements OnInit {
  @Input() className ?: string;
  @Input() routerLink !: string;

  constructor() { }

  ngOnInit(): void {
  }

}
