import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/shared/models/device';
import { HardwareManagementService } from '../hardware-management.service';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices!: Device[];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hardwareManagementService: HardwareManagementService
  ) {

  }

  

  ngOnInit(): void {
    this.hardwareManagementService.devices$.subscribe((devices) => {
      this.devices = devices;
    })
    
  }

  onDetails(deviceName: string) {
    this.router.navigate([`../device/${deviceName}`], { relativeTo: this.route });
  }
}
