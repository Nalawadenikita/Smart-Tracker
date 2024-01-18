import { TestBed } from '@angular/core/testing';

import { DistributorUserService } from './distributor-user.service';

describe('DistributorUserService', () => {
  let service: DistributorUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
