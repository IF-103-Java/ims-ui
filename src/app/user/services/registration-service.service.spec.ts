import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration-service.service';

describe('RegistrationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationService = TestBed.get(RegistrationService);
    expect(service).toBeTruthy();
  });
});
