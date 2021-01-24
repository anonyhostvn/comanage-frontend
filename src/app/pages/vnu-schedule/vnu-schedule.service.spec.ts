import { TestBed } from '@angular/core/testing';

import { VnuScheduleService } from './vnu-schedule.service';

describe('VnuScheduleService', () => {
  let service: VnuScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VnuScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
