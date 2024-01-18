import { TestBed } from '@angular/core/testing';

import { RefillersService } from './refillers.service';

describe('RefillersService', () => {
  let service: RefillersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefillersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
