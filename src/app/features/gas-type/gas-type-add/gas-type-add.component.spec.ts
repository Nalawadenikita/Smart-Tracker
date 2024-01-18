import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasTypeAddComponent } from './gas-type-add.component';

describe('GasTypeAddComponent', () => {
  let component: GasTypeAddComponent;
  let fixture: ComponentFixture<GasTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
