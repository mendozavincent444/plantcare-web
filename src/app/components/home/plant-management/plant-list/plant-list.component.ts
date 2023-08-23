import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/shared/plant';
import { PlantManagementService } from '../plant-management.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  plants!: Plant[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private plantManagementService: PlantManagementService
    ) {

  }

  

  ngOnInit(): void {
    this.plantManagementService.plants$.subscribe((plants) => {
      this.plants = plants;
    });
  }

  onDetails(plantName: string) {
    this.router.navigate([`../plant/${plantName}`], { relativeTo: this.route });
  }
}
