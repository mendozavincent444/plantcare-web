import { TestBed } from '@angular/core/testing';

import { HardwareManagementService } from './hardware-management.service';

describe('DeviceManagementService', () => {
  let service: HardwareManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
