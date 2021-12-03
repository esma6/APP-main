import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherPoolComponent } from './researcher-pool.component';

describe('ResearcherPoolComponent', () => {
  let component: ResearcherPoolComponent;
  let fixture: ComponentFixture<ResearcherPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearcherPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
