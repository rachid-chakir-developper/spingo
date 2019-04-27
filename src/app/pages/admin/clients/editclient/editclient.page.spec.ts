import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientPage } from './editclient.page';

describe('EditclientPage', () => {
  let component: EditclientPage;
  let fixture: ComponentFixture<EditclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
