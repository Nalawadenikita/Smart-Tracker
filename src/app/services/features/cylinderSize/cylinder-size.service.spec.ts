import { TestBed } from '@angular/core/testing';

import { CylinderSizeService } from './cylinder-size.service';

describe('CylinderSizeService', () => {
  let service: CylinderSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CylinderSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
