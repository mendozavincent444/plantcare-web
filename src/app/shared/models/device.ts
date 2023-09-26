export class Device {
    deviceName: string;
    deviceType: string;
    farmName: string;
    deviceStatus: string;

    constructor(deviceName: string, deviceType: string, farmName: string, deviceStatus: string) {
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.farmName = farmName;
        this.deviceStatus = deviceStatus;
    }

}
