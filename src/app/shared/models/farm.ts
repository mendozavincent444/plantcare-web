import { User } from "./user";

export class Farm {

    id: number;
    location: string;
    name: string;
    users: User[];
    //sensors: Sensor[];
    owner: User;
    mainArduinoBoardId: number;

    constructor(
        id: number, 
        location: string, 
        name: string, 
        mainArduinoBoardId?: number,
        users?: User[], 
        owner?: User,
    ) {
        this.id = id;
        this.location = location;
        this.name = name;
        this.users = users;
        this.owner = owner;
        this.mainArduinoBoardId = mainArduinoBoardId;
    }
}
