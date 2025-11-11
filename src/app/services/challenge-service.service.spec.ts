import { TestBed } from '@angular/core/testing';

import { ChallengeService } from './challenge.service';

describe('ChallengeServiceService', () => {
  let service: ChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
