import { TestBed } from '@angular/core/testing';

import { QuestDataService } from './quest-data.service';

describe('QuestDataService', () => {
  let service: QuestDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
