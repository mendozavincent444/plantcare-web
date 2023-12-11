import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost:8080";

  constructor() { }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
