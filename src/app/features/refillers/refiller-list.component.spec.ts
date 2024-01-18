import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillerListComponent } from './refiller-list.component';

describe('RefillerListComponent', () => {
  let component: RefillerListComponent;
  let fixture: ComponentFixture<RefillerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefillerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
