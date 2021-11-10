import { Component, Input, OnInit } from '@angular/core';
import { HomeDto } from '../home';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() links !: HomeDto;

  constructor() { }

  ngOnInit(): void {
  }

}
