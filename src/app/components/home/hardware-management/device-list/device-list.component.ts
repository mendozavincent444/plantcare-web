import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/shared/models/device';
import { HardwareManagementService } from '../hardware-management.service';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  farms: Farm[];
  devices: Device[];
  farmListForm: FormGroup;
  deviceType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hardwareManagementService: HardwareManagementService,
    private farmService: FarmManagementService
  ) {

  }

  // let map = new Map(); 
  // fix - use map in this class

  ngOnInit(): void {
    this.farmService.getAllFarms().subscribe(farms => {
      this.farms = farms;
    })

    this.farmListForm = new FormGroup({
      "farm": new FormControl(""),
      "deviceType": new FormControl("sensors")
    });

  }

  onDetails(deviceId: number) {
    const deviceType = this.farmListForm.value["deviceType"];
    const farmId = this.farmListForm.value["farm"];

    this.router.navigate([`../farms/${farmId}/devices/${deviceType}/${deviceId}`], { relativeTo: this.route });
  }

  onChangeFarm() {
    this.onChangeType();
  }

  onChangeType() {
    if (!this.farmListForm.value["farm"]) {
      return;
    }

    const deviceType = this.farmListForm.value["deviceType"];
    const farmId = this.farmListForm.value["farm"];

    this.deviceType = this.currentType(deviceType);
    this.getDeviceListByTypeAndFarm(this.deviceType, farmId);
  }

  private getDeviceListByTypeAndFarm(deviceType: string, farmId: number) {
    if (deviceType === "Sensor") {
      this.hardwareManagementService.getAllSensorsByFarmId(farmId).subscribe(data => this.devices = data);

    } else if (deviceType === "Pump") {
      this.hardwareManagementService.getAllPumpsByFarmId(farmId).subscribe(data => this.devices = data);

    } else {
      this.hardwareManagementService.getAllArduinoBoardsByFarmId(farmId).subscribe(data => this.devices = data);

    }
  }

  currentType(deviceType: string): string {

    if (deviceType === "sensors") {
      return "Sensor";
    } else if (deviceType === "pumps") {
      return "Pump";
    } else {
      return "Arduino Board";
    }
  }

  onDeleteDevice(deviceId: number) {
    const deviceType = this.deviceType;
    const farmId = this.farmListForm.value["farm"];

    this.deleteDevice(deviceId, farmId, deviceType);
  }

  private deleteDevice(deviceId: number, farmId: number, deviceType: string) {
    if (deviceType === "Sensor") {
      this.hardwareManagementService.deleteSensorById(farmId, deviceId).subscribe(data => {
        // fix - receive data
        console.log(data);
      });

    } else if (deviceType === "Pump") {
      this.hardwareManagementService.deletePumpById(farmId, deviceId).subscribe(data => {
        // fix - receive data
        console.log(data);
      });

    } else {
      this.hardwareManagementService.deleteArduinoBoardById(farmId, deviceId).subscribe(data => {
        // fix - receive data
        console.log(data);
      });
    }
  }
}
