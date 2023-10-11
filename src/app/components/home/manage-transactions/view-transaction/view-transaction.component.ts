import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/shared/models/transaction';
import { ManageTransactionsService } from '../manage-transactions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  transaction: Transaction;

  constructor(
    private manageTransactionsService: ManageTransactionsService,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
    const transactionId = this.route.snapshot.params["transaction-id"];

    this.manageTransactionsService.getTransactionById(transactionId).subscribe(data => {
      this.transaction = data;
    })
  }
}
