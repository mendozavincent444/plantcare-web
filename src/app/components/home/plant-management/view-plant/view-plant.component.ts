import { Component } from '@angular/core';
import { Plant } from 'src/app/shared/models/plant';
import { PlantManagementService } from '../plant-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-plant',
  templateUrl: './view-plant.component.html',
  styleUrls: ['./view-plant.component.css']
})
export class ViewPlantComponent {
  plantId: number;
  farmId: number;
  plant: Plant;
  editPlantForm: FormGroup;

  editMode!: boolean;

  constructor(
    private plantService: PlantManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.plantId = this.route.snapshot.params["plant-id"];
    this.farmId = this.route.snapshot.params["farm-id"];
    this.editMode = false;

    this.plantService.getPlantById(this.plantId, this.farmId).subscribe(data => {
      this.plant = data;
      this.initializeEditForm(this.plant);
    });


  }

  private initializeEditForm(plant: Plant): void {
    this.editPlantForm = new FormGroup({
      "plantName": new FormControl(plant.name, Validators.required),
      "daysToMaturity": new FormControl(plant.daysToMaturity, Validators.required),
      "maximumEc": new FormControl(plant.maximumEc, Validators.required),
      "minimumEc": new FormControl(plant.minimumEc, Validators.required),
      "maximumPh": new FormControl(plant.maximumPh, Validators.required),
      "minimumPh": new FormControl(plant.minimumPh, Validators.required),
    });
  }

  get plantName() {
    return this.editPlantForm.controls["plantName"];
  }

  get daysToMaturity() {
    return this.editPlantForm.controls["daysToMaturity"];
  }

  get maximumEc() {
    return this.editPlantForm.controls["maximumEc"];
  }

  get minimumEc() {
    return this.editPlantForm.controls["minimumEc"];
  }

  get maximumPh() {
    return this.editPlantForm.controls["maximumPh"];
  }

  get minimumPh() {
    return this.editPlantForm.controls["minimumPh"];
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onEditPlant() {
    const editPlantForm = this.editPlantForm.value;

    const plant = new Plant(
      editPlantForm.plantName,
      editPlantForm.maximumEc,
      editPlantForm.maximumPh,
      editPlantForm.minimumEc,
      editPlantForm.minimumPh,
      editPlantForm.daysToMaturity
    );

    /*
    this.plantService.editPlant(plant, this.plantId, this.farmId).subscribe(data => {
      // fix - response
      console.log(data);
      this.toggleEditMode();
      this.ngOnInit();
    });*/


    this.plantService.editPlant(plant, this.plantId, this.farmId).subscribe({
      next: data => {
        this.toggleEditMode();
        this.ngOnInit();
        Swal.fire("Plant edited successfully.", "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });
  }

}
