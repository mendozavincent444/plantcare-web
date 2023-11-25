import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HarvestLogDto } from 'src/app/shared/payload/harvest-log-dto';
import { DashboardService } from '../dashboard.service';
import { FarmManagementService } from '../../farm-management/farm-management.service';

@Component({
  selector: 'app-harvest-logs',
  templateUrl: './harvest-logs.component.html',
  styleUrls: ['./harvest-logs.component.css']
})
export class HarvestLogsComponent implements OnInit {

  harvestLogsForm: FormGroup;
  harvestLogs: HarvestLogDto[];
  currentFarmId: number;


  constructor(
    private dashboardService: DashboardService,
    private farmService: FarmManagementService
  ) {}


  ngOnInit(): void {
    this.farmService.getCurrentFarm().subscribe(data => this.currentFarmId = data.id);

    this.dashboardService.getAllHarvestLogsByFarmId(this.currentFarmId).subscribe(data => {
      this.harvestLogs = data;
    })

    

    this.harvestLogsForm = new FormGroup({
  
    });
  }

}
