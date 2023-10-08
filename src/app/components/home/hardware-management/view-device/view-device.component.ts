import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/shared/models/device';
import { HardwareManagementService } from '../hardware-management.service';
import { Farm } from 'src/app/shared/models/farm';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent implements OnInit {
  editMode!: boolean;
  device: Device;
  deviceType: string;

  constructor(
    private route: ActivatedRoute,
    private hardwareManagementService: HardwareManagementService
  ) {}

  ngOnInit(): void {
    this.editMode = false;

    const farmId = this.route.snapshot.params["farm-id"];
    const deviceId = this.route.snapshot.params["device-id"];

    this.deviceType = this.getDevice(farmId, deviceId);
  }

  private getDevice(farmId: number, deviceId: number): string {
    const deviceTypeFromRoute = this.route.snapshot.params["device"];

    if (deviceTypeFromRoute === "sensors") {
      this.hardwareManagementService.getSensorById(farmId, deviceId).subscribe(data => this.device = data);
      return "Sensor";
    } else if (deviceTypeFromRoute === "pumps") {
      this.hardwareManagementService.getPumpById(farmId, deviceId).subscribe(data => this.device = data);
      return "Pump";
    } else {
      this.hardwareManagementService.getArduinoBoardById(farmId, deviceId).subscribe(data => this.device = data);
      return "Arduino Board";
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
