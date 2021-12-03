import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerPoolComponent } from './producer-pool.component';

describe('ProducerPoolComponent', () => {
  let component: ProducerPoolComponent;
  let fixture: ComponentFixture<ProducerPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
