import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HomeDto, LinkDto } from './home';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly homeUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) {

  }

  links !: HomeDto;

  ngOnInit() {
    this.getLinks()
      .subscribe(links => this.links = links);
  }

  private getLinks(): Observable<HomeDto> {
    return this.http.get<HomeDto>(this.homeUrl);
  }
}
