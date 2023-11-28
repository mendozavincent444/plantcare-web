import { SubscriptionType } from "./subscription-type";

export class Subscription {
    id: number;
    subscriptionType: SubscriptionType;
    startDate: Date;
    endDate: Date;
}
