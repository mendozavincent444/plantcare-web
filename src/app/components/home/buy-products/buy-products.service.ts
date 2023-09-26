import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BuyProductsService {

  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.products$.next([
      new Product("pH Sensor", 0),
      new Product("Water Pump", 0),
      new Product("Water level Sensor", 0),
      new Product("Nutrient level Sensor", 0)
    ]);
  }
}
