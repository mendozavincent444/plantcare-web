import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageTransactionsService } from '../manage-transactions.service';
import { Transaction } from 'src/app/shared/models/transaction';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  currentUser: User;
  transactions!: Transaction[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageTransactionsService: ManageTransactionsService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
      this.populateTransactions();
    });
  }

  private populateTransactions(): void {
    if (this.isRoleAdmin()) {
      this.getAllTransactionsByAdmin();
    } else if (this.isRoleSuperAdmin()) {
      this.getAllTransactions();
    }
  }

  private getAllTransactionsByAdmin(): void {
    this.manageTransactionsService.getAllTransactionsByAdmin().subscribe(data => {
      this.transactions = data;
    });
  }

  private getAllTransactions(): void {
    this.manageTransactionsService.getAllTransactions().subscribe(data => {
      this.transactions = data;
    });
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
    return transaction.status == "APPROVED" ? true : false; 
  }

  isRoleAdmin(): boolean {
    return this.currentUser.role === "ROLE_ADMIN" ? true : false;
  }

  isRoleSuperAdmin(): boolean {
    return this.currentUser.role === "ROLE_SUPERADMIN" ? true : false;
  }
}
