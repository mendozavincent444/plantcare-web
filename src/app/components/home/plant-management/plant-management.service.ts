import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/plant';

const PLANT_API = "http://localhost:8080/api/v1/farms/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlantManagementService {

  plants$: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>(null);

  constructor(private httpClient: HttpClient) {
  }

  public getAllPlantsByFarm(farmId: number): Observable<any> {
    return this.httpClient.get(PLANT_API + `${farmId}/plants`, httpOptions)
  }

  public addPlant(plant: Plant, farmId: number) {
    return this.httpClient.post(PLANT_API + `${farmId}/plants`, plant, httpOptions);
  }

  public deletePlantById(plantId: number, farmId: number) {
    return this.httpClient.delete(PLANT_API + `${farmId}/plants/${plantId}`, httpOptions);
  }

  public getPlantById(plantId: number, farmId: number): Observable<any> {
    return this.httpClient.get(PLANT_API + `${farmId}/plants/${plantId}`, httpOptions);
  }

  public editPlant(plant: Plant, plantId: number, farmId: number) {
    return this.httpClient.put(PLANT_API + `${farmId}/plants/${plantId}`, plant, httpOptions);
  }



}
