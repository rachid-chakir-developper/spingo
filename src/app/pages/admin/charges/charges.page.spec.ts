import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesPage } from './charges.page';

describe('ChargesPage', () => {
  let component: ChargesPage;
  let fixture: ComponentFixture<ChargesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
