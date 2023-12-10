import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/models/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseDto } from 'src/app/shared/payload/purchase-dto';
import { PurchaseSubscriptionDto } from 'src/app/shared/payload/purchase-subscription-dto';
import { ApiService } from 'src/app/shared/services/api.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageTransactionsService {

  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) {
    
  }

  TRANSACTION_API = this.apiService.getBaseUrl() + "/api/v1/transactions";

  public createTransactionByProduct(purchaseDto: PurchaseDto): Observable<String> {
    return this.httpClient.post<String>(this.TRANSACTION_API, purchaseDto, httpOptions);
  }

  public createTransactionBySubscription(purchaseSubscriptionDto: PurchaseSubscriptionDto): Observable<String> {
    return this.httpClient.post<String>(this.TRANSACTION_API + "/subscription", purchaseSubscriptionDto, httpOptions);
  }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.TRANSACTION_API + "/all", httpOptions);
  }

  public getAllTransactionsByAdmin(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.TRANSACTION_API, httpOptions);
  }

  public getTransactionById(transactionId: number): Observable<Transaction> {
    return this.httpClient.get<Transaction>(this.TRANSACTION_API + `/${transactionId}`, httpOptions);
  }

  public approveTransactionById(transactionId: number): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.TRANSACTION_API + `/${transactionId}/approve`, httpOptions);
  }


}
