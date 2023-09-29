export class RegisterRequestDto {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    farmId: number


    constructor(
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        password: string, 
        role: string,
        farmId?: number
    ) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.farmId = farmId;
    }
}
