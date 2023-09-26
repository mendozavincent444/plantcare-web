export class RegisterRequestDto {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;


    constructor(
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        password: string, 
        role: string
    ) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
    }
}
