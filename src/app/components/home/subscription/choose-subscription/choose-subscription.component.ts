import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { SubscriptionType } from 'src/app/shared/models/subscription-type';

@Component({
  selector: 'app-choose-subscription',
  templateUrl: './choose-subscription.component.html',
  styleUrls: ['./choose-subscription.component.css']
})
export class ChooseSubscriptionComponent implements OnInit {

  subscriptionTypes: SubscriptionType[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) {

  }

  ngOnInit(): void {
    this.subscriptionService.getAllSubscriptionTypes().subscribe(data => this.subscriptionTypes = data);
  }

  onPurchaseSubscription(subscriptionType: SubscriptionType) {

    this.subscriptionService.saveSubscriptionType(subscriptionType);

    this.router.navigate(["../subscription-payment"], { relativeTo: this.route });
  }

}
