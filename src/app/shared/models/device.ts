export class Device {
    id: number;
    name: string;
    status: string;
    sensorTypeName: string

    constructor(id: number, name: string, status: string, sensorTypeName?: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.sensorTypeName = sensorTypeName;
    }

}
