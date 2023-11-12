import { ArduinoBoard } from "../models/arduino-board";
import { AddressDto } from "./address-dto";

export class PurchaseSubscriptionDto {
    paymentMethod: string;
    billingAddressDto: AddressDto;
    price: number;
    subscriptionTypeId: number;

    constructor(
        paymentMethod: string,
        billingAddressDto: AddressDto,
        price: number,
        subscriptionTypeId: number
    ) {
        this.paymentMethod = paymentMethod;
        this.billingAddressDto = billingAddressDto;
        this.price = price;
        this.subscriptionTypeId = subscriptionTypeId;
    }
}


