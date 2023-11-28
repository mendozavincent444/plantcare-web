import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriptionType } from 'src/app/shared/models/subscription-type';

const SUBSCRIPTION_TYPE_API = "http://localhost:8080/api/v1/subscription-types";

const SUBSCRIPTION_API = "http://localhost:8080/api/v1/subscriptions";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  
  subscriptionType$: BehaviorSubject<SubscriptionType> = new BehaviorSubject<SubscriptionType>(null);

  constructor(private httpClient: HttpClient) {
  }

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
    return this.httpClient.delete(SUBSCRIPTION_API, httpOptions);
  }

  public getSubscription(): Observable<any> {
    return this.httpClient.get(SUBSCRIPTION_API, httpOptions);
  }

  public getAllSubscriptionTypes(): Observable<SubscriptionType[]> {
    return this.httpClient.get<SubscriptionType[]>(SUBSCRIPTION_TYPE_API, httpOptions);
  }

  
}
