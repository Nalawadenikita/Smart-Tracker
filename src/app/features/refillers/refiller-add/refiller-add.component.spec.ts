import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillerAddComponent } from './refiller-add.component';

describe('RefillerAddComponent', () => {
  let component: RefillerAddComponent;
  let fixture: ComponentFixture<RefillerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefillerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
