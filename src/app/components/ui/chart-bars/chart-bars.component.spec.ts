import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarsComponent } from './chart-bars.component';

describe('ChartBarsComponent', () => {
  let component: ChartBarsComponent;
  let fixture: ComponentFixture<ChartBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
