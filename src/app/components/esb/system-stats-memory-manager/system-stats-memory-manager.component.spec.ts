import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatsMemoryManagerComponent } from './system-stats-memory-manager.component';

describe('SystemStatsMemoryManagerComponent', () => {
  let component: SystemStatsMemoryManagerComponent;
  let fixture: ComponentFixture<SystemStatsMemoryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemStatsMemoryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemStatsMemoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
