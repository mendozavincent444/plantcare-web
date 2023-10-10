import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionStatus } from './TransactionStatus';
import { Transaction } from 'src/app/shared/models/transaction';
import { User } from 'src/app/shared/models/user';
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
    this.loadData();
    
  }


  loadData(): void {
    
    const user: User = new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer");


    this.transactions$.next([
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
      new Transaction(1, new Date(2023),"Water Level Sensor Purchase", "description", 49.99, TransactionStatus.FAILED, "Credit Card", user),
    ]);
    
  }

  public createTransaction(purchaseDto: PurchaseDto): Observable<String> {
    return this.httpClient.post<String>(TRANSACTION_API, purchaseDto, httpOptions);
  }
}
