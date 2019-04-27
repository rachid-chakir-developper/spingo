import { TestBed } from '@angular/core/testing';

import { ContraventionService } from './contravention.service';

describe('ContraventionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContraventionService = TestBed.get(ContraventionService);
    expect(service).toBeTruthy();
  });
});
