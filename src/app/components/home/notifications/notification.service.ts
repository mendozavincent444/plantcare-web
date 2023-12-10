import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDto } from 'src/app/shared/payload/notificationdto';
import { ApiService } from 'src/app/shared/services/api.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) { }

  NOTIFICATION_API = this.apiService.getBaseUrl() + "/api/v1/notifications";

  public getAllNotifications(): Observable<NotificationDto[]> {
    return this.httpClient.get<NotificationDto[]>(this.NOTIFICATION_API, httpOptions);
  }
}
