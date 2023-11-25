import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, window } from 'rxjs';
import { Farm } from 'src/app/shared/models/farm';

const FARM_API = "http://localhost:8080/api/v1/farms";
const FARM_KEY = "current-farm";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmManagementService {

  $farm: BehaviorSubject<Farm> = new BehaviorSubject<Farm>(null);

  constructor(private httpClient: HttpClient) {
    
  }

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
    return this.httpClient.post(FARM_API, { name, location }, httpOptions);
  }

  public getAllFarms(): Observable<Farm[]> {
    return this.httpClient.get<Farm[]>(FARM_API, httpOptions);
  }

  public deleteFarmById(farmId: number): Observable<any> {
    return this.httpClient.delete(`${FARM_API}/${farmId}`, httpOptions);
  }

  public getFarmById(farmId: number): Observable<any> {
    return this.httpClient.get(`${FARM_API}/${farmId}`, httpOptions);
  }

  public getAdminsByFarmId(farmId: number): Observable<any> {
    return this.httpClient.get(`${FARM_API}/${farmId}/admins`, httpOptions);
  }

  public getAllTasksFromAllContainers(farmId: number): Observable<any> {
    return this.httpClient.get(`${FARM_API}/${farmId}/containers/tasks/all`, httpOptions);
  }

  public updateFarm(farm: Farm ,farmId: number, newOwnerId: number): Observable<any> {
    return this.httpClient.put(`${FARM_API}/${farmId}/new-owner/${newOwnerId}`, farm, httpOptions);
  }


}
