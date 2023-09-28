export class EditUserProfileDto {
    private password: string;
    private firstName: string;
    private lastName: string;


    constructor(
        firstName: string,
        lastName: string,
        password: string,
        ) {
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
    }
}
