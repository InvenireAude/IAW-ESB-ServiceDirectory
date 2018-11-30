import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmStatusServicesComponent } from './sm-status-services.component';

describe('SmStatusServicesComponent', () => {
  let component: SmStatusServicesComponent;
  let fixture: ComponentFixture<SmStatusServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmStatusServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmStatusServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
