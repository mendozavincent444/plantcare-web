import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageTransactionsService } from '../manage-transactions.service';
import { Transaction } from 'src/app/shared/models/transaction';

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
    this.manageTransactionsService.getAllTransactions().subscribe(data => {
      this.transactions = data;
    })

  }

  onDetails(transactionId: number) {
    this.router.navigate([`../transaction/${transactionId}`], { relativeTo: this.route });
  }

  onApproveTransaction(transactionId: number) {
    this.manageTransactionsService.approveTransactionById(transactionId).subscribe(data => {
      // fix - receive - data
      console.log(data);
      this.ngOnInit();
    });
  }

  isApproved(transaction: Transaction) {
    return transaction.status == "Approved" ? true : false; 
  }
}
