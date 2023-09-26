import { Role } from "./role"; 

export class User {
    id: number;
    role: Role;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;

    constructor(
        id: number,
        userRole: Role,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        password?: string
    ) {
        this.id = id;
        this.role = userRole;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
}