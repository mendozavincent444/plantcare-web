import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmManagementService } from '../farm-management.service';
import { Farm } from 'src/app/shared/models/farm';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.css']
})
export class FarmListComponent implements OnInit {

  farms!: Farm[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private farmManagementService: FarmManagementService) {
  }

  ngOnInit(): void {
    // fix - use view resolver to load all farms before page is opened
    this.farmManagementService.getAllFarms().subscribe(data => {
      this.farmManagementService.saveFarms(data);
      this.farms = data;
    });
  }

  onDetails(farmName: string) {
    this.router.navigate([`../farm/${farmName}`], { relativeTo: this.route });
  }
}
