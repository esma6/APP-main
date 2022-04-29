import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPoolComponent } from './dev-pool.component';

describe('DevPoolComponent', () => {
  let component: DevPoolComponent;
  let fixture: ComponentFixture<DevPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
