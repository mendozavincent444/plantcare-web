import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from 'src/app/shared/models/device';

@Injectable({
  providedIn: 'root'
})
export class HardwareManagementService {

  devices$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>(null);

  constructor() {
    this.loadData();
  }


  private loadData(): void {
    this.devices$.next([
      new Device("Water Level Sensor", "Sensor", "AquaGrove Growers", "Available"),
      new Device("Temperature Sensor", "Sensor", "AquaHarvest Gardens Farm", "Available"),
      new Device("EC Nutrient Sensor", "Sensor", "SkyHigh Hydro Farm", "Available"),
      new Device("Light Intensity Sensor", "Sensor", "HydroGreens Farm", "Available"),
      new Device("Humidity Sensor", "Sensor", "H2Oasis Farms", "Not Available"),
      new Device("CO2 Sensor", "Sensor", "AquaVine Growers", "Available"),
      new Device("Nutrient Dosing Pump", "Pump", "GreenWave Hydroponics", "Not Available"),
      new Device("Water Circulation Pump", "Pump", "HydroHaven Farmstead", "Not Available"),
      new Device("Water Chiller/Heater", "Pump", "faAquaRoots Cultivationsrm", "Not Available"),
      new Device("pH Level Sensor", "Sensor", "CloudCrop Hydro Farms", "Available"),
    ]);
  }
}
