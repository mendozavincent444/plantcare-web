import { TestBed } from '@angular/core/testing';

import { ManageFarmersService } from './manage-farmers.service';

describe('ManageFarmersService', () => {
  let service: ManageFarmersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFarmersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
