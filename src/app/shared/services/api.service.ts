import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://crandel.online";

  constructor() { }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
