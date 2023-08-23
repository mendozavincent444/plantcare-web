import { TestBed } from '@angular/core/testing';

import { FarmManagementService } from './farm-management.service';

describe('FarmManagementService', () => {
  let service: FarmManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
