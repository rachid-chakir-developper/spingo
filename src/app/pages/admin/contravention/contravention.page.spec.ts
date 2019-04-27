import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraventionPage } from './contravention.page';

describe('ContraventionPage', () => {
  let component: ContraventionPage;
  let fixture: ComponentFixture<ContraventionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContraventionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraventionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
