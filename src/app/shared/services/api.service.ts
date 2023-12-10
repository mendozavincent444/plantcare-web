import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://ec2-34-239-114-172.compute-1.amazonaws.com";

  constructor() { }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
