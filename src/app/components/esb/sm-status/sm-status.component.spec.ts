import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SMStatusComponent } from './sm-status.component';

describe('SmStatusComponent', () => {
  let component: SMStatusComponent;
  let fixture: ComponentFixture<SMStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
