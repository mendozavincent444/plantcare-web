import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDto } from 'src/app/shared/payload/notificationdto';

const NOTIFICATION_API = "http://localhost:8080/api/v1/notifications";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllNotifications(): Observable<NotificationDto[]> {
    return this.httpClient.get<NotificationDto[]>(NOTIFICATION_API, httpOptions);
  }
}
