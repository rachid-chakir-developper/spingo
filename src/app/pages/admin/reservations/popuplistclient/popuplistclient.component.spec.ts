import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuplistclientPage } from './popuplistclient.page';

describe('PopuplistclientPage', () => {
  let component: PopuplistclientPage;
  let fixture: ComponentFixture<PopuplistclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopuplistclientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuplistclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
