import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmStatusConfigRgComponent } from './sm-status-config-rg.component';

describe('SmStatusConfigRgComponent', () => {
  let component: SmStatusConfigRgComponent;
  let fixture: ComponentFixture<SmStatusConfigRgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmStatusConfigRgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmStatusConfigRgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
