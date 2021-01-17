import { TestBed } from '@angular/core/testing';

import { GrrnService } from './grrn.service';

describe('GrrnService', () => {
  let service: GrrnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrrnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
