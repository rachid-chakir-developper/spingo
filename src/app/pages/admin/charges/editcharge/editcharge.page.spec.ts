import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchargePage } from './editcharge.page';

describe('EditchargePage', () => {
  let component: EditchargePage;
  let fixture: ComponentFixture<EditchargePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchargePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchargePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
