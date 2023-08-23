import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Farm } from 'src/app/shared/farm';
import { FarmManagementService } from '../farm-management.service';

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
    this.farmManagementService.farms$.subscribe((farms) => {
      this.farms = farms;
    });
  }

  onDetails(farmName: string) {
    this.router.navigate([`../farm/${farmName}`], { relativeTo: this.route });
  }
}
