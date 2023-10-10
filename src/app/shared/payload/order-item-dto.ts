import { Product } from "../models/product";

export class OrderItemDto {
    quantity: number;
    unitPrice: number;
    product: Product;

    constructor(quantity: number, unitPrice: number, product: Product) {
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.product = product;
    }
}
