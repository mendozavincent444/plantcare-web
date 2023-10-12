import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantManagementService } from '../plant-management.service';
import { Plant } from 'src/app/shared/models/plant';
import { FormControl, FormGroup } from '@angular/forms';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  plants!: Plant[];
  plantListForm: FormGroup;
  farms: Farm[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private plantManagementService: PlantManagementService,
    private farmService: FarmManagementService
  ) {

  }

  ngOnInit(): void {
    this.farmService.getAllFarms().subscribe(data => {
      this.farms = data;
    });

    this.plantListForm = new FormGroup({
      "farm": new FormControl("")
    });
  }

  onDelete(plantId: number) {
    const farmId = this.plantListForm.value["farm"];

    this.plantManagementService.deletePlantById(plantId, farmId).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.ngOnInit();
    })
  }

  onChangeFarm() {
    const farmId = this.plantListForm.value["farm"];

    this.plantManagementService.getAllPlantsByFarm(farmId).subscribe(data => {
      this.plants = data;
    })
  }

  onDetails(plantId: number) {
    const farmId = this.plantListForm.value["farm"];

    this.router.navigate([`../farm/${farmId}/plant/${plantId}`], { relativeTo: this.route });
  }
}
