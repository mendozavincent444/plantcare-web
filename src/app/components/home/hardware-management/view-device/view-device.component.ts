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
  device: Device;
  deviceType: string;

  constructor(
    private route: ActivatedRoute,
    private hardwareManagementService: HardwareManagementService
  ) { }

  ngOnInit(): void {

    const farmId = this.route.snapshot.params["farm-id"];
    const deviceId = this.route.snapshot.params["device-id"];
    const deviceTypeFromRoute = this.route.snapshot.params["device"];

    this.deviceType = this.getDeviceType(deviceTypeFromRoute);
    this.getDevice(farmId, deviceId, this.deviceType);
  }

  private getDevice(farmId: number, deviceId: number, deviceTypeFromRoute: string) {
    if (deviceTypeFromRoute === "Sensor") {
      this.hardwareManagementService.getSensorById(farmId, deviceId).subscribe(data => this.device = data);

    } else if (deviceTypeFromRoute === "Pump") {
      this.hardwareManagementService.getPumpById(farmId, deviceId).subscribe(data => this.device = data);

    } else {
      this.hardwareManagementService.getArduinoBoardById(farmId, deviceId).subscribe(data => this.device = data);

    }
  }

  private getDeviceType(deviceType: string): string {
    if (deviceType === "sensors") {
      return "Sensor";
    } else if (deviceType === "pumps") {
      return "Pump";
    } else {
      return "Arduino Board";
    }
  }
}
