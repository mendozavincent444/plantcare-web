import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/shared/transaction';
import { User } from 'src/app/shared/user';
import { TransactionStatus } from '../TransactionStatus';
import { Roles } from 'src/app/shared/roles';
import { ManageTransactionsService } from '../manage-transactions.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions!: Transaction[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageTransactionsService: ManageTransactionsService
  ) {

  }

  

  ngOnInit(): void {
    this.manageTransactionsService.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
    });
    
  }

  onDetails(transactionName: string) {
    this.router.navigate([`../transaction/${transactionName}`], { relativeTo: this.route });
  }
}
