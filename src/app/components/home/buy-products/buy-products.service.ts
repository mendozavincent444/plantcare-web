import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

const PRODUCT_API = "http://localhost:8080/api/v1/products";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BuyProductsService {

  productsOrdered$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);

  constructor(private httpClient: HttpClient) {
  }

  public emptyCart() {
    this.productsOrdered$.next(null);
  }

  public saveOrder(products: Product[]) {
    this.productsOrdered$.next(products);
  }

  public getAllCartProducts(): Product[] {
    return this.productsOrdered$.getValue();
  }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(PRODUCT_API, httpOptions);
  }

  
}
