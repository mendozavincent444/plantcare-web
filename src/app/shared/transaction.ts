import { TransactionStatus } from "../components/home/manage-transactions/TransactionStatus";
import { User } from "./user";

export class Transaction {

    id: number;
    transactionDate: Date;
    transactionName: string;
    transactionDescription: string;
    transactionAmount: number;
    transactionStatus: TransactionStatus;
    transactionPaymentMethod: string;
    transactionUser: User;
    
    constructor(
        id: number,
        transactionDate: Date,
        transactionName: string,
        transactionDescription: string,
        transactionAmount: number,
        transactionStatus: TransactionStatus,
        transactionPaymentMethod: string,
        transactionUser: User
    ) {
        this.id = id;
        this.transactionDate = transactionDate;
        this.transactionName = transactionName;
        this.transactionDescription = transactionDescription;
        this.transactionAmount = transactionAmount;
        this.transactionStatus = transactionStatus;
        this.transactionPaymentMethod = transactionPaymentMethod;
        this.transactionUser = transactionUser;
    }
}
