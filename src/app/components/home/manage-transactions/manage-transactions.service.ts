import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/models/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseDto } from 'src/app/shared/payload/purchase-dto';

const TRANSACTION_API = "http://localhost:8080/api/v1/transactions";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageTransactionsService {

  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(null);

  constructor(private httpClient: HttpClient) {
    
  }




  public createTransaction(purchaseDto: PurchaseDto): Observable<String> {
    return this.httpClient.post<String>(TRANSACTION_API, purchaseDto, httpOptions);
  }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(TRANSACTION_API, httpOptions);
  }

  public getTransactionById(transactionId: number): Observable<Transaction> {
    return this.httpClient.get<Transaction>(TRANSACTION_API + `/${transactionId}`, httpOptions);
  }
}
