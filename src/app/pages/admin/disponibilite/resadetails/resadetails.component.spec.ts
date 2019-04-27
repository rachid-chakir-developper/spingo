import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResadetailsPage } from './resadetails.page';

describe('ResadetailsPage', () => {
  let component: ResadetailsPage;
  let fixture: ComponentFixture<ResadetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResadetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResadetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
