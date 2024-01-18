import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorLoginComponent } from './distributor-login.component';

describe('LoginComponent', () => {
  let component: DistributorLoginComponent;
  let fixture: ComponentFixture<DistributorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
