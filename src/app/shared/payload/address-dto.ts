export class AddressDto {
    city: string;
    province: string;
    street: string;
    zipCode: string;

    constructor(
        city: string,
        province: string,
        street: string,
        zipCode: string
    ) {
        this.city = city;
        this.province = province;
        this.street = street; 
        this.zipCode = zipCode;
    }
}
