import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArduinoBoard } from 'src/app/shared/models/arduino-board';
import { Device } from 'src/app/shared/models/device';
import { Pump } from 'src/app/shared/models/pump';
import { Sensor } from 'src/app/shared/models/sensor';
import { SensorType } from 'src/app/shared/models/sensor-type';
import { ApiService } from 'src/app/shared/services/api.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HardwareManagementService {

  devices$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>(null);

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) {
  }

  FARM_API = this.apiService.getBaseUrl() + "/api/v1/farms";
  SENSOR_TYPE_API = this.apiService.getBaseUrl() + "/api/v1/sensortypes";

  public getAllSensorsByFarmId(farmId: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.FARM_API + `/${farmId}/sensors`, httpOptions);
  }

  public getAllPumpsByFarmId(farmId: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.FARM_API + `/${farmId}/pumps`, httpOptions);
  }

  public getAllArduinoBoardsByFarmId(farmId: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.FARM_API + `/${farmId}/arduinoboards`, httpOptions);
  }

  public getSensorById(farmId: number, sensorId: number): Observable<Device> {
    return this.httpClient.get<Device>(this.FARM_API + `/${farmId}/sensors/${sensorId}`, httpOptions);
  }

  public getPumpById(farmId: number, pumpId: number): Observable<Device> {
    return this.httpClient.get<Device>(this.FARM_API + `/${farmId}/pumps/${pumpId}`, httpOptions);
  }

  public getArduinoBoardById(farmId: number, arduinoBoardId: number): Observable<Device> {
    return this.httpClient.get<Device>(this.FARM_API + `/${farmId}/arduinoboards/${arduinoBoardId}`, httpOptions);
  }

  public deleteArduinoBoardById(farmId: number, arduinoBoardId: number): Observable<String> {
    return this.httpClient.delete<String>(this.FARM_API + `/${farmId}/arduinoboards/${arduinoBoardId}`, httpOptions);
  }

  public deletePumpById(farmId: number, pumpId: number): Observable<String> {
    return this.httpClient.delete<String>(this.FARM_API + `/${farmId}/pumps/${pumpId}`, httpOptions);
  }

  public deleteSensorById(farmId: number, sensorId: number): Observable<String> {
    return this.httpClient.delete<String>(this.FARM_API + `/${farmId}/sensors/${sensorId}`, httpOptions);
  }

  public getAllSensorTypes(): Observable<SensorType[]> {
    return this.httpClient.get<SensorType[]>(this.SENSOR_TYPE_API, httpOptions);
  }

  public addSensor(name: string, sensorTypeName: string, farmId: number): Observable<Sensor> {
    return this.httpClient.post<Sensor>(this.FARM_API + `/${farmId}/sensors`, { name, sensorTypeName }, httpOptions);
  }

  public addArduinoBoard(name: string, farmId: number): Observable<ArduinoBoard> {
    return this.httpClient.post<ArduinoBoard>(this.FARM_API + `/${farmId}/arduinoboards`, { name }, httpOptions);
  }

  public addPump(name: string, farmId: number): Observable<Pump> {
    return this.httpClient.post<Pump>(this.FARM_API + `/${farmId}/pumps`, { name }, httpOptions);
  }


}
