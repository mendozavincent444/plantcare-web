import { TransactionStatus } from "src/app/components/home/manage-transactions/TransactionStatus";
import { User } from "./user";
import { OrderItemDto } from "../payload/order-item-dto";

export class Transaction {

    id: number;
    date: Date;
    name: string;
    description: string;
    amount: number;
    status: TransactionStatus;
    orderItems: OrderItemDto[];
    paymentMethod: string;
    orderedBy: string;
    
    constructor(
        id: number,
        date: Date,
        name: string,
        description: string,
        amount: number,
        status: TransactionStatus,
        orderItems: OrderItemDto[],
        paymentMethod: string,
        orderedBy: string
    ) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.orderItems = orderItems;
        this.paymentMethod = paymentMethod;
        this.orderedBy = orderedBy;
    }
}
