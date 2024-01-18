import { TestBed } from '@angular/core/testing';

import { GasTypeService } from './gas-type.service';

describe('GasTypeService', () => {
  let service: GasTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
