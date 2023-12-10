import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

  FARM_API = this.apiService.getBaseUrl() + "/api/v1/farms/";

  public getAllHarvestLogsByFarmId(farmId: number): Observable<any> {
    return this.httpClient.get(this.FARM_API + `${farmId}/harvest-logs`, httpOptions)
  }

  public getAllTasksFromAllContainers(farmId: number): Observable<any> {
    return this.httpClient.get(this.FARM_API + `${farmId}/containers/tasks/all`, httpOptions)
  }
}
