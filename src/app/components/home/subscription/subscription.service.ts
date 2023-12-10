import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriptionType } from 'src/app/shared/models/subscription-type';
import { ApiService } from 'src/app/shared/services/api.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  
  subscriptionType$: BehaviorSubject<SubscriptionType> = new BehaviorSubject<SubscriptionType>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) {
  }

  SUBSCRIPTION_TYPE_API = this.apiService.getBaseUrl() + "/api/v1/subscription-types";

  SUBSCRIPTION_API = this.apiService.getBaseUrl() + "/api/v1/subscriptions";

  public emptySubscriptionType() {
    this.subscriptionType$.next(null);
  }

  public saveSubscriptionType(subscriptionType: SubscriptionType) {
    this.subscriptionType$.next(subscriptionType);
  }

  public getSubscriptionTypes(): SubscriptionType {
    return this.subscriptionType$.getValue();
  }

  public cancelSubscription(): Observable<any> {
    return this.httpClient.delete(this.SUBSCRIPTION_API, httpOptions);
  }

  public getSubscription(): Observable<any> {
    return this.httpClient.get(this.SUBSCRIPTION_API, httpOptions);
  }

  public getAllSubscriptionTypes(): Observable<SubscriptionType[]> {
    return this.httpClient.get<SubscriptionType[]>(this.SUBSCRIPTION_TYPE_API, httpOptions);
  }

  
}
