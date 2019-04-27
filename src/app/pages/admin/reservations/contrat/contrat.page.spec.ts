import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratPage } from './contrat.page';

describe('ContratPage', () => {
  let component: ContratPage;
  let fixture: ComponentFixture<ContratPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
