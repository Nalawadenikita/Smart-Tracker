import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CylinderSizeAddComponent } from './cylinder-size-add.component';

describe('CylinderSizeAddComponent', () => {
  let component: CylinderSizeAddComponent;
  let fixture: ComponentFixture<CylinderSizeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CylinderSizeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CylinderSizeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
