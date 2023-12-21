import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { AddressDto } from 'src/app/shared/payload/address-dto';
import { PurchaseSubscriptionDto } from 'src/app/shared/payload/purchase-subscription-dto';
import { ManageTransactionsService } from '../../manage-transactions/manage-transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.css']
})
export class SubscriptionPaymentComponent implements OnInit, OnDestroy {
  subscriptionPaymentForm: FormGroup;

  constructor(
    private subscriptionService: SubscriptionService,
    private transactionService: ManageTransactionsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeSubscriptionPaymentForm();
  }

  ngOnDestroy(): void {
    this.subscriptionService.emptySubscriptionType();
  }

  private initializeSubscriptionPaymentForm() {
    this.subscriptionPaymentForm = new FormGroup({
      "streetBillingAddress": new FormControl(null, Validators.required),
      "cityBillingAddress": new FormControl(null, Validators.required),
      "provinceBillingAddress": new FormControl(null, Validators.required),
      "zipCodeBillingAddress": new FormControl(null, Validators.required),
      "paymentMethod": new FormControl("", Validators.required)
    });
  }

  get streetBillingAddress() {
    return this.subscriptionPaymentForm.controls["streetBillingAddress"];
  }

  get cityBillingAddress() {
    return this.subscriptionPaymentForm.controls["cityBillingAddress"];
  }

  get provinceBillingAddress() {
    return this.subscriptionPaymentForm.controls["provinceBillingAddress"];
  }

  get zipCodeBillingAddress() {
    return this.subscriptionPaymentForm.controls["zipCodeBillingAddress"];
  }

  onPurchaseSubscription() {
    const streetBillingAddress = this.subscriptionPaymentForm.value["streetBillingAddress"];
    const cityBillingAddress = this.subscriptionPaymentForm.value["cityBillingAddress"];
    const provinceBillingAddress = this.subscriptionPaymentForm.value["provinceBillingAddress"];
    const zipCodeBillingAddress = this.subscriptionPaymentForm.value["zipCodeBillingAddress"];
    const paymentMethod = this.subscriptionPaymentForm.value["paymentMethod"];

    const billingAddress = new AddressDto(
      cityBillingAddress,
      provinceBillingAddress,
      streetBillingAddress, 
      zipCodeBillingAddress
    );

    const subscriptionType = this.subscriptionService.getSubscriptionTypes();

    const purchaseSubscriptionDto = new PurchaseSubscriptionDto(
      paymentMethod,
      billingAddress,
      subscriptionType.price,
      subscriptionType.id
    );

    this.transactionService.createTransactionBySubscription(purchaseSubscriptionDto).subscribe({
      next: data => {
        this.subscriptionService.emptySubscriptionType();
        this.subscriptionPaymentForm.reset();
        this.router.navigate(["../choose-subscription"], { relativeTo: this.route });
        Swal.fire(data.message, "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });


  }
}
