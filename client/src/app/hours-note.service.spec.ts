import { TestBed } from '@angular/core/testing';

import { HoursNoteService } from './hours-note.service';

describe('HoursNoteService', () => {
  let service: HoursNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoursNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
