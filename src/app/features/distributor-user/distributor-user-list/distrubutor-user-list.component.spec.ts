import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrubutorUserListComponent } from './distrubutor-user-list.component';

describe('DistrubutorUserListComponent', () => {
  let component: DistrubutorUserListComponent;
  let fixture: ComponentFixture<DistrubutorUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrubutorUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrubutorUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
