import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuplistpartenairePage } from './popuplistpartenaire.page';

describe('PopuplistpartenairePage', () => {
  let component: PopuplistpartenairePage;
  let fixture: ComponentFixture<PopuplistpartenairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopuplistpartenairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuplistpartenairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
