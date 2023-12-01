export class NotificationDto {

    id: number;
    date: Date;
    content: string;
    title: string;

    constructor(
        id: number,
        date: Date,
        content: string,
        title: string
    ) {
        this.id = id;
        this.date = date;
        this.content = content; 
        this.title = title;
    }

}
