import { AddressDto } from "./address-dto";
import { OrderItemDto } from "./order-item-dto";

export class PurchaseDto {
    orderItems: OrderItemDto[];
    shippingAddressDto: AddressDto;
    billingAddressDto: AddressDto;
    paymentMethod: string;

    constructor(
        orderItems: OrderItemDto[],
        shippingAddressDto: AddressDto,
        billingAddressDto: AddressDto,
        paymentMethod: string
    ) {
        this.orderItems = orderItems;
        this.shippingAddressDto = shippingAddressDto;
        this.billingAddressDto = billingAddressDto;
        this.paymentMethod = paymentMethod;
    }
}
