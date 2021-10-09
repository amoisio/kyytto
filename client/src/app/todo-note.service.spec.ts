import { TestBed } from '@angular/core/testing';

import { TodoNoteService } from './todo-note.service';

describe('TodoNoteService', () => {
  let service: TodoNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
