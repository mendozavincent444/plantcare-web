import { Roles } from "./roles";

export class Role {
    id: number;
    role_name: Roles

    constructor(id: number, role_name: Roles) {
        this.id = id;
        this.role_name = role_name;
    }
}