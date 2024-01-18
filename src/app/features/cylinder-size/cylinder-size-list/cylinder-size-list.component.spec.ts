import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CylinderSizeListComponent } from './cylinder-size-list.component';

describe('CylinderSizeListComponent', () => {
  let component: CylinderSizeListComponent;
  let fixture: ComponentFixture<CylinderSizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CylinderSizeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CylinderSizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
