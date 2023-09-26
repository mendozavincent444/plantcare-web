import { User } from "./user";

export class Farm {

    id: number;
    farmLocation: string;
    farmName: string;
    users: User[];
    //sensors: Sensor[];
    farmOwner: User;

    constructor(
        id: number, 
        farmLocation: string, 
        farmName: string, 
        users: User[], 
        farmOwner: User
    ) {
        this.id = id;
        this.farmLocation = farmLocation;
        this.farmName = farmName;
        this.users = users;
        this.farmOwner = farmOwner;
    }
}
