import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasTypeListComponent } from './gas-type-list.component';

describe('GasTypeListComponent', () => {
  let component: GasTypeListComponent;
  let fixture: ComponentFixture<GasTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
