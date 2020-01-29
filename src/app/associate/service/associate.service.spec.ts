import { TestBed } from '@angular/core/testing';

import { AssociateService } from './associate.service';

describe('AssociateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociateService = TestBed.get(AssociateService);
    expect(service).toBeTruthy();
  });
});
