import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, window } from 'rxjs';
import { Farm } from 'src/app/shared/models/farm';
import { ApiService } from 'src/app/shared/services/api.service';

const FARM_KEY = "current-farm";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmManagementService {

  $farm: BehaviorSubject<Farm> = new BehaviorSubject<Farm>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) {
    
  }

  FARM_API = this.apiService.getBaseUrl() + "/api/v1/farms";

  public saveFarm(currentFarm: Farm) {
    this.$farm.next(currentFarm);
    sessionStorage.setItem(FARM_KEY, JSON.stringify(currentFarm));
  }

  public clearFarm() {
    this.$farm.next(null);
  }

  public getCurrentFarm() {
    return this.$farm;
  }

  public autoLoadFarm() {
    const currentFarm = JSON.parse(sessionStorage.getItem(FARM_KEY));

    if (!currentFarm) {
      this.$farm.next(null);
    }

    this.$farm.next(currentFarm);
  }

  public addFarm(name: string, location: string): Observable<any> {
    return this.httpClient.post(this.FARM_API, { name, location }, httpOptions);
  }

  public getAllFarms(): Observable<Farm[]> {
    return this.httpClient.get<Farm[]>(this.FARM_API, httpOptions);
  }

  public deleteFarmById(farmId: number): Observable<any> {
    return this.httpClient.delete(`${this.FARM_API}/${farmId}`, httpOptions);
  }

  public getFarmById(farmId: number): Observable<any> {
    return this.httpClient.get(`${this.FARM_API}/${farmId}`, httpOptions);
  }

  public getAdminsByFarmId(farmId: number): Observable<any> {
    return this.httpClient.get(`${this.FARM_API}/${farmId}/admins`, httpOptions);
  }

  public getAllTasksFromAllContainers(farmId: number): Observable<any> {
    return this.httpClient.get(`${this.FARM_API}/${farmId}/containers/tasks/all`, httpOptions);
  }

  public updateFarm(farm: Farm ,farmId: number, newOwnerId: number): Observable<any> {
    return this.httpClient.put(`${this.FARM_API}/${farmId}/new-owner/${newOwnerId}`, farm, httpOptions);
  }

  public setMainArduinoBoard(farmId: number, arduinoBoardId: number): Observable<any> {
    return this.httpClient.patch(`${this.FARM_API}/${farmId}/arduino-board/${arduinoBoardId}`, httpOptions);
  }

  public removeMainArduinoBoard(farmId: number): Observable<any> {
    return this.httpClient.patch(`${this.FARM_API}/${farmId}`, httpOptions);
  }


}
