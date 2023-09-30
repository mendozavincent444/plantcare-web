export class User {
    id: number;
    role: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    accountNonLocked?: boolean;

    constructor(
        id: number,
        userRole: string,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        password?: string,
        accountNonLocked?: boolean
    ) {
        this.id = id;
        this.role = userRole;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.accountNonLocked = accountNonLocked;
    }
}