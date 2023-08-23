import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plant } from 'src/app/shared/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantManagementService {

  plants$: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>(null);

  constructor() {
    this.loadData();
  }


  private loadData(): void {
    
    this.plants$.next([
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
      new Plant("Asparagus", 1.8, 6.8, 1.4, 6.0, "20 to 35 days"),
    ]);
  }
}
