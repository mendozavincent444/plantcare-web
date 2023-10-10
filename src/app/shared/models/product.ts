export class Product {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    quantity: number;

    constructor(
        id: number, 
        name: string, 
        description: string, 
        unitPrice: number, 
        imageUrl: string,
        quantity: number
        ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}
