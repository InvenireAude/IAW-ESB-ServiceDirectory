import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBrickComponent } from './menu-brick.component';

describe('MenuBrickComponent', () => {
  let component: MenuBrickComponent;
  let fixture: ComponentFixture<MenuBrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
