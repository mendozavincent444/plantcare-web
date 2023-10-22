import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantManagementService } from '../plant-management.service';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { Plant } from 'src/app/shared/models/plant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {
  addPlantForm: FormGroup;
  farms: Farm[];
  currentFarmId: number;

  constructor(
    private plantService: PlantManagementService,
    private farmService: FarmManagementService,
    private router: Router,
    private route: ActivatedRoute
    ) { }


  ngOnInit(): void {

    this.farmService.getAllFarms().subscribe(data => {
      this.farms = data;
    })

    this.addPlantForm = new FormGroup({
      "plantName": new FormControl(null, Validators.required),
      "maximumEc": new FormControl(null, Validators.required),
      "minimumEc": new FormControl(null, Validators.required),
      "maximumPh": new FormControl(null, Validators.required),
      "minimumPh": new FormControl(null, Validators.required),
      "daysToMaturity": new FormControl(null, Validators.required)
    });

    this.farmService.getCurrentFarm().subscribe(farm => this.currentFarmId = farm.id);
  }

  onAddPlant() {
    const plantName = this.addPlantForm.value["plantName"];
    const maximumEc = this.addPlantForm.value["maximumEc"];
    const minimumEc = this.addPlantForm.value["minimumEc"];
    const maximumPh = this.addPlantForm.value["maximumPh"];
    const minimumPh = this.addPlantForm.value["minimumPh"];
    const daysToMaturity = this.addPlantForm.value["daysToMaturity"];
    const farmId = this.currentFarmId;
    
    const plant = new Plant(
      plantName,
      maximumEc,
      minimumEc,
      maximumPh,
      minimumPh,
      daysToMaturity,
    );

    this.plantService.addPlant(plant, farmId).subscribe(data => {
      // receive data
      console.log(data);
      this.addPlantForm.reset();
      this.router.navigate(["../plant-list"], { relativeTo: this.route });
    });
    
  }


}
