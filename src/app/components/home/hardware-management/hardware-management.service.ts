import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArduinoBoard } from 'src/app/shared/models/arduino-board';
import { Device } from 'src/app/shared/models/device';
import { Pump } from 'src/app/shared/models/pump';
import { Sensor } from 'src/app/shared/models/sensor';
import { SensorType } from 'src/app/shared/models/sensor-type';

const FARM_API = "http://localhost:8080/api/v1/farms";
const SENSOR_TYPE_API = "http://localhost:8080/api/v1/sensortypes";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HardwareManagementService {

  devices$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>(null);

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getAllSensorsByFarmId(farmId: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(FARM_API + `/${farmId}/sensors`, httpOptions);
  }

  public getAllPumpsByFarmId(farmId: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(FARM_API + `/${farmId}/pumps`, httpOptions);
  }

  public getAllArduinoBoardsByFarmId(farmId: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(FARM_API + `/${farmId}/arduinoboards`, httpOptions);
  }

  public getSensorById(farmId: number, sensorId: number): Observable<Device> {
    return this.httpClient.get<Device>(FARM_API + `/${farmId}/sensors/${sensorId}`, httpOptions);
  }

  public getPumpById(farmId: number, pumpId: number): Observable<Device> {
    return this.httpClient.get<Device>(FARM_API + `/${farmId}/pumps/${pumpId}`, httpOptions);
  }

  public getArduinoBoardById(farmId: number, arduinoBoardId: number): Observable<Device> {
    return this.httpClient.get<Device>(FARM_API + `/${farmId}/arduinoboards/${arduinoBoardId}`, httpOptions);
  }

  public deleteArduinoBoardById(farmId: number, arduinoBoardId: number): Observable<String> {
    return this.httpClient.delete<String>(FARM_API + `/${farmId}/arduinoboards/${arduinoBoardId}`, httpOptions);
  }

  public deletePumpById(farmId: number, pumpId: number): Observable<String> {
    return this.httpClient.delete<String>(FARM_API + `/${farmId}/pumps/${pumpId}`, httpOptions);
  }

  public deleteSensorById(farmId: number, sensorId: number): Observable<String> {
    return this.httpClient.delete<String>(FARM_API + `/${farmId}/sensors/${sensorId}`, httpOptions);
  }

  public getAllSensorTypes(): Observable<SensorType[]> {
    return this.httpClient.get<SensorType[]>(SENSOR_TYPE_API, httpOptions);
  }

  public addSensor(name: string, sensorTypeName: string, farmId: number): Observable<Sensor> {
    return this.httpClient.post<Sensor>(FARM_API + `/${farmId}/sensors`, { name, sensorTypeName }, httpOptions);
  }

  public addArduinoBoard(name: string, farmId: number): Observable<ArduinoBoard> {
    return this.httpClient.post<ArduinoBoard>(FARM_API + `/${farmId}/arduinoboards`, { name }, httpOptions);
  }

  public addPump(name: string, farmId: number): Observable<Pump> {
    return this.httpClient.post<Pump>(FARM_API + `/${farmId}/pumps`, { name }, httpOptions);
  }


}
