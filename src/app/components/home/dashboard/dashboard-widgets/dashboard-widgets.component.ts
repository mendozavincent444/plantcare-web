import { Component } from '@angular/core';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { Farm } from 'src/app/shared/models/farm';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TaskDto } from 'src/app/shared/payload/task-dto';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.css']
})
export class DashboardWidgetsComponent {

  farm: Farm;
  tasks: TaskDto[];

  constructor(
    private farmService: FarmManagementService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.farmService.getCurrentFarm().subscribe(farm => {
      this.farm = farm;
    });

    this.dashboardService.getAllTasksFromAllContainers(this.farm.id).subscribe(data => {
      this.tasks = data;
      this.initializeCalendar(this.tasks);
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  }

  private initializeCalendar(tasks: TaskDto[]) {
    let eventsValues = [];

    tasks.forEach((task) => {
      eventsValues.push({ title: task.plantName, date: task.harvestDate.toLocaleDateString() });
    });

    this.calendarOptions.events = eventsValues;
  };
}

