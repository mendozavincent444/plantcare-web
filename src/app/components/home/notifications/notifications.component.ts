import { Component, OnInit } from '@angular/core';
import { NotificationDto } from 'src/app/shared/payload/notificationdto';
import { NotificationService } from './notification.service';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: NotificationDto[];

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe(data => this.notifications = data);
  }

}
