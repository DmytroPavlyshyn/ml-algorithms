import { TestBed } from '@angular/core/testing';

import { SvrService } from './svr.service';

describe('SvrService', () => {
  let service: SvrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
