import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

const FARM_API = "http://localhost:8080/api/v1/farms";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageFarmersService {

  farmers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  constructor(private httpClient: HttpClient) {
  }

  public getAllFarmersByFarmId(farmId: number): Observable<any> {
    return this.httpClient.get(FARM_API + `/${farmId}/farmers`);
  }
}
