import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmStatusConfigComponent } from './sm-status-config.component';

describe('SmStatusConfigComponent', () => {
  let component: SmStatusConfigComponent;
  let fixture: ComponentFixture<SmStatusConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmStatusConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmStatusConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
