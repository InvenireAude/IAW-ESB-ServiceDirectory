import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerStatsComponent } from './broker-stats.component';

describe('BrokerStatsComponent', () => {
  let component: BrokerStatsComponent;
  let fixture: ComponentFixture<BrokerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
