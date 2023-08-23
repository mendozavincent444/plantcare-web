export class Plant {

    plantName: string;
    plantMaximumEC: number;
    plantMaximumPH: number;
    plantMinimumEC: number;
    plantMinimumPH: number;
    daysToMaturity: string;

    constructor(
        plantName: string,
        plantMaximumEC: number,
        plantMaximumPH: number,
        plantMinimumEC: number,
        plantMinimumPH: number,
        daysToMaturity: string
    ) {
        this.plantName = plantName;
        this.plantMaximumEC = plantMaximumEC;
        this.plantMaximumPH = plantMaximumPH;
        this.plantMinimumEC = plantMinimumEC;
        this.plantMinimumPH = plantMinimumPH;
        this.daysToMaturity = daysToMaturity;
    }
}
