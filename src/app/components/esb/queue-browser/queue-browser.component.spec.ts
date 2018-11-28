import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueBrowserComponent } from './queue-browser.component';

describe('QueueBrowserComponent', () => {
  let component: QueueBrowserComponent;
  let fixture: ComponentFixture<QueueBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
