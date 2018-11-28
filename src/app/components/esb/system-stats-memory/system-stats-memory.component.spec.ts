import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatsMemoryComponent } from './system-stats-memory.component';

describe('SystemStatsMemoryComponent', () => {
  let component: SystemStatsMemoryComponent;
  let fixture: ComponentFixture<SystemStatsMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemStatsMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemStatsMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
