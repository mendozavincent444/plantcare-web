import { Subscription } from "src/app/shared/models/subscription";

export class User {
    id: number;
    role: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    accountNonLocked?: boolean;
    allowNotifications?: boolean;
    subscription?: Subscription;

    constructor(
        id: number,
        userRole: string,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        password?: string,
        accountNonLocked?: boolean,
        allowNotifications?: boolean,
        subscription?: Subscription
    ) {
        this.id = id;
        this.role = userRole;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.accountNonLocked = accountNonLocked;
        this.allowNotifications = allowNotifications;
        this.subscription = subscription;
    }
}