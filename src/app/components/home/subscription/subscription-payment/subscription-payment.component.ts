import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { AddressDto } from 'src/app/shared/payload/address-dto';
import { PurchaseSubscriptionDto } from 'src/app/shared/payload/purchase-subscription-dto';
import { provideCloudflareLoader } from '@angular/common';
import { ManageTransactionsService } from '../../manage-transactions/manage-transactions.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      "paymentMethod": new FormControl("")
    });
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

    this.transactionService.createTransactionBySubscription(purchaseSubscriptionDto).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.subscriptionService.emptySubscriptionType();
      this.subscriptionPaymentForm.reset();
      this.router.navigate(["../choose-subscription"], { relativeTo: this.route });
    })


  }
}
