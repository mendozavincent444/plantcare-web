import { Component, OnInit } from '@angular/core';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HardwareManagementService } from '../hardware-management.service';
import { SensorType } from 'src/app/shared/models/sensor-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {


  farms: Farm[];
  addDeviceForm: FormGroup;
  sensorTypes: SensorType[];

  constructor(
    private farmManagementService: FarmManagementService,
    private hardwareManagementService: HardwareManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.populateFarms();
    this.populateSensorTypes();
    this.initializeAddDeviceForm();
  }

  private populateFarms() {
    this.farmManagementService.getAllFarms().subscribe(data => {
      this.farms = data;
    })
  }

  private populateSensorTypes() {
    this.hardwareManagementService.getAllSensorTypes().subscribe(data => {
      this.sensorTypes = data;
    });
  }

  private initializeAddDeviceForm() {
    this.addDeviceForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "sensorType": new FormControl("", Validators.required),
      "deviceType": new FormControl("", Validators.required),
      "farmId": new FormControl("", Validators.required)
    });
  }

  public isSensorType() {
    const deviceType = this.addDeviceForm.value["deviceType"];

    return deviceType === "sensor" ? true : false;
  }

  onAddDevice() {
    const deviceType = this.addDeviceForm.value["deviceType"];
    const name = this.addDeviceForm.value["name"];
    const farmId = this.addDeviceForm.value["farmId"];

    if (deviceType === "sensor") {
      const sensorType = this.addDeviceForm.value["sensorType"];

      this.hardwareManagementService.addSensor(name, sensorType, farmId).subscribe();
    } else if (deviceType === "pump") {

      this.hardwareManagementService.addPump(name, farmId).subscribe();
    } else if (deviceType === "arduinoBoard") {

      this.hardwareManagementService.addArduinoBoard(name, farmId).subscribe();
    }

    this.router.navigate(["../device-list"], { relativeTo: this.route });
  }

}