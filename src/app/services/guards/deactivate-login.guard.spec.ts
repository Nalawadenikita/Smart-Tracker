import { TestBed } from '@angular/core/testing';

import { DeactivateLoginGuard } from './deactivate-login.guard';

describe('DeactivateLoginGuard', () => {
  let guard: DeactivateLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactivateLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
