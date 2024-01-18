import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerholdingComponent } from './customerholding.component';

describe('CustomerholdingComponent', () => {
  let component: CustomerholdingComponent;
  let fixture: ComponentFixture<CustomerholdingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerholdingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerholdingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
