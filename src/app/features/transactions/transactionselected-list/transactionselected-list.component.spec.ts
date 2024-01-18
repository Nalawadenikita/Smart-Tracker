import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionselectedListComponent } from './transactionselected-list.component';

describe('TransactionselectedListComponent', () => {
  let component: TransactionselectedListComponent;
  let fixture: ComponentFixture<TransactionselectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionselectedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionselectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
