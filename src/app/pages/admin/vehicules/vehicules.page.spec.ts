import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesPage } from './vehicules.page';

describe('VehiculesPage', () => {
  let component: VehiculesPage;
  let fixture: ComponentFixture<VehiculesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
