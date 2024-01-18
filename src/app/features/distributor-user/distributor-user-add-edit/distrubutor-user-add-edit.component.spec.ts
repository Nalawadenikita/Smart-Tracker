import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorAddEditComponent } from './distrubutor-user-add-edit.component';

describe('DistrubutorUserAddEditComponent', () => {
  let component: DistributorAddEditComponent;
  let fixture: ComponentFixture<DistributorAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
