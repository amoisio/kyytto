import { TestBed } from '@angular/core/testing';

import { LearningNoteService } from './learning-note.service';

describe('LearningNoteService', () => {
  let service: LearningNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
