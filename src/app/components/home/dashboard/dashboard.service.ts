import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const FARM_API = "http://localhost:8080/api/v1/farms/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllHarvestLogsByFarmId(farmId: number): Observable<any> {
    return this.httpClient.get(FARM_API + `${farmId}/harvest-logs`, httpOptions)
  }

  public getAllTasksFromAllContainers(farmId: number): Observable<any> {
    return this.httpClient.get(FARM_API + `${farmId}/containers/tasks/all`, httpOptions)
  }
}
