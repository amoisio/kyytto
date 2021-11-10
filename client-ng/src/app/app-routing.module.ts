import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoursComponent } from './hours/hours.component';
import { LearningComponent } from './learning/learning.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  // { path: '', redirectTo: '/learning', pathMatch: 'full' },
  { path: 'learning', component: LearningComponent },
  { path: 'hours', component: HoursComponent },
  { path: 'todos', component: TodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
