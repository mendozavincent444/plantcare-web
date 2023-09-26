import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionStatus } from './TransactionStatus';
import { Transaction } from 'src/app/shared/models/transaction';
import { User } from 'src/app/shared/models/user';
import { Role } from 'src/app/shared/models/role';
import { Roles } from 'src/app/shared/models/roles';


@Injectable({
  providedIn: 'root'
})
export class ManageTransactionsService {

  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(null);

  constructor() {
    this.loadData();
    
  }


  loadData(): void {
    
    const user: User = new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer");


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
}
