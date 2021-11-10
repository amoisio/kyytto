import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LearningComponent } from './learning/learning.component';
import { HoursComponent } from './hours/hours.component';
import { TodosComponent } from './todos/todos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteButtonComponent } from './note-button/note-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LearningComponent,
    HoursComponent,
    TodosComponent,
    NoteButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
