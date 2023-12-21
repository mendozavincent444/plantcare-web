import { Component, OnInit } from '@angular/core';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HardwareManagementService } from '../hardware-management.service';
import { SensorType } from 'src/app/shared/models/sensor-type';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  farms: Farm[];
  addDeviceForm: FormGroup;
  sensorTypes: SensorType[];
  currentFarmId: number;

  constructor(
    private farmService: FarmManagementService,
    private hardwareManagementService: HardwareManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.populateFarms();
    this.populateSensorTypes();
    this.initializeAddDeviceForm();

    this.farmService.getCurrentFarm().subscribe(farm => this.currentFarmId = farm.id);
  }

  private populateFarms() {
    this.farmService.getAllFarms().subscribe(data => {
      this.farms = data;
    });
  }

  private populateSensorTypes() {
    this.hardwareManagementService.getAllSensorTypes().subscribe(data => {
      this.sensorTypes = data;
    });
  }

  private initializeAddDeviceForm() {
    this.addDeviceForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "sensorType": new FormControl(""),
      "deviceType": new FormControl("", Validators.required)
    });
  }

  get name() {
    return this.addDeviceForm.controls["name"];
  }

  public isSensorType() {
    const deviceType = this.addDeviceForm.value["deviceType"];

    return deviceType === "sensor" ? true : false;
  }

  onAddDevice() {
    const deviceType = this.addDeviceForm.value["deviceType"];
    const name = this.addDeviceForm.value["name"];
    const farmId = this.currentFarmId;

    if (deviceType === "sensor") {
      const sensorType = this.addDeviceForm.value["sensorType"];

      this.hardwareManagementService.addSensor(name, sensorType, farmId).subscribe({
        next: data => {
          Swal.fire("Device added successfully.", "Success", "success");
        },
        error: err => {
          Swal.fire(err.error.message, "Error", "error");
        }
      });
    } else if (deviceType === "pump") {

      this.hardwareManagementService.addPump(name, farmId).subscribe({
        next: data => {
          Swal.fire("Device added successfully.", "Success", "success");
        },
        error: err => {
          Swal.fire(err.error.message, "Error", "error");
        }
      });

    } else if (deviceType === "arduinoBoard") {

      this.hardwareManagementService.addArduinoBoard(name, farmId).subscribe({
        next: data => {
          Swal.fire("Device added successfully.", "Success", "success");
        },
        error: err => {
          Swal.fire(err.error.message, "Error", "error");
        }
      });
    }

    this.router.navigate(["../device-list"], { relativeTo: this.route });

  }

}
