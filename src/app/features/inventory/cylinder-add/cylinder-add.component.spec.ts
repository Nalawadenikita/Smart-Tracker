import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CylinderAddComponent } from './cylinder-add.component';

describe('CylinderAddComponent', () => {
  let component: CylinderAddComponent;
  let fixture: ComponentFixture<CylinderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CylinderAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CylinderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
