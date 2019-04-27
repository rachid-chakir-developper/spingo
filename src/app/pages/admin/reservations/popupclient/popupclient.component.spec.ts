import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupclientPage } from './popupclient.page';

describe('PopupclientPage', () => {
  let component: PopupclientPage;
  let fixture: ComponentFixture<PopupclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupclientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
