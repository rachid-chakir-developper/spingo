import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilitePage } from './disponibilite.page';

describe('DisponibilitePage', () => {
  let component: DisponibilitePage;
  let fixture: ComponentFixture<DisponibilitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
