import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareManagementService } from './hardware-management.component';

describe('DeviceManagementComponent', () => {
  let component: HardwareManagementService;
  let fixture: ComponentFixture<HardwareManagementService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareManagementService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
