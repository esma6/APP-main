import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivistsPoolComponent } from './activists-pool.component';

describe('ActivistsPoolComponent', () => {
  let component: ActivistsPoolComponent;
  let fixture: ComponentFixture<ActivistsPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivistsPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivistsPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
