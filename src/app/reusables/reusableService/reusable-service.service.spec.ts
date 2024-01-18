import { TestBed } from '@angular/core/testing';

import { ReusableServiceService } from './reusable-service.service';

describe('ReusableServiceService', () => {
  let service: ReusableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReusableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
