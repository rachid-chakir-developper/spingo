import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuplistvehiculePage } from './popuplistvehicule.page';

describe('PopuplistvehiculePage', () => {
  let component: PopuplistvehiculePage;
  let fixture: ComponentFixture<PopuplistvehiculePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopuplistvehiculePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuplistvehiculePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
