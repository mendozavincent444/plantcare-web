import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageFarmersService {

  farmers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) {
  }

  FARM_API = this.apiService.getBaseUrl() + "/api/v1/farms";

  public getAllFarmersByFarmId(farmId: number): Observable<any> {
    return this.httpClient.get(this.FARM_API + `/${farmId}/farmers`, httpOptions);
  }

  public deleteFarmerByFarm(farmId: number, farmerId: number): Observable<any> {
    return this.httpClient.delete(this.FARM_API + `/${farmId}/farmers/${farmerId}`, httpOptions);
  }

}

