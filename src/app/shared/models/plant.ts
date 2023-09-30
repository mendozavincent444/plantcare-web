export class Plant {
    id: number;
    name: string;
    maximumEc: number;
    maximumPh: number;
    minimumEc: number;
    minimumPh: number;
    daysToMaturity: string;

    constructor(
        name: string,
        maximumEc: number,
        maximumPh: number,
        minimumEc: number,
        minimumPh: number,
        daysToMaturity: string,
        id?: number
    ) {
        this.name = name;
        this.maximumEc = maximumEc;
        this.maximumPh = maximumPh;
        this.minimumEc = minimumEc;
        this.minimumPh = minimumPh;
        this.daysToMaturity = daysToMaturity;
        this.id = id;
    }
}
