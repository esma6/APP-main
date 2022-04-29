import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivistsComponent } from './activists.component';

describe('ActivistsComponent', () => {
  let component: ActivistsComponent;
  let fixture: ComponentFixture<ActivistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
