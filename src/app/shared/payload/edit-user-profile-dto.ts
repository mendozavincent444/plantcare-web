export class EditUserProfileDto {
    private firstName: string;
    private lastName: string;


    constructor(
        firstName: string,
        lastName: string,
        ) {
            this.firstName = firstName;
            this.lastName = lastName;
    }
}
