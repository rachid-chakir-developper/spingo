import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvehiculePage } from './editvehicule.page';

describe('EditvehiculePage', () => {
  let component: EditvehiculePage;
  let fixture: ComponentFixture<EditvehiculePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvehiculePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvehiculePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
