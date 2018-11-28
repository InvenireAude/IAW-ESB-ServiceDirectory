import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatsQueuesComponent } from './system-stats-queues.component';

describe('SystemStatsQueuesComponent', () => {
  let component: SystemStatsQueuesComponent;
  let fixture: ComponentFixture<SystemStatsQueuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemStatsQueuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemStatsQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
