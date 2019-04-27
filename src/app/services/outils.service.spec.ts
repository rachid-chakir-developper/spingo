import { TestBed } from '@angular/core/testing';

import { OutilsService } from './outils.service';

describe('OutilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutilsService = TestBed.get(OutilsService);
    expect(service).toBeTruthy();
  });
});
