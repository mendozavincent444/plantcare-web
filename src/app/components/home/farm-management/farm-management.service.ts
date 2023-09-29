import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farm } from 'src/app/shared/models/farm';

const FARM_API = "http://localhost:8080/api/v1/farms";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmManagementService {

  farms$: BehaviorSubject<Farm[]> = new BehaviorSubject<Farm[]>(null);;

  constructor(private httpClient: HttpClient) {
    
  }

  public saveFarms(farm: Farm[]) {
    this.farms$.next(farm);
  }

  public addFarm(name: string, location: string): Observable<any> {
    return this.httpClient.post(FARM_API, { name, location }, httpOptions);
  }

  public getAllFarms(): Observable<any> {
    return this.httpClient.get(FARM_API);
  }




}
