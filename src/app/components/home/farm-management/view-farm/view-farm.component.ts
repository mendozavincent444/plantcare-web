import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmManagementService } from '../farm-management.service';
import { Farm } from 'src/app/shared/models/farm';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-view-farm',
  templateUrl: './view-farm.component.html',
  styleUrls: ['./view-farm.component.css']
})
export class ViewFarmComponent implements OnInit {
  admins: User[];
  editFarmForm: FormGroup;
  editMode!: boolean;
  farm: Farm;
  farmId: number;

  constructor(
    private route: ActivatedRoute,
    private farmService: FarmManagementService
  ) {

  }


  ngOnInit(): void {
    this.editMode = false;

    this.farmId = this.route.snapshot.params["farm-id"];

    this.farmService.getFarmById(this.farmId).subscribe(data => {
      this.farm = data;
      this.initializeEditFarmForm(this.farm);
    })

    this.farmService.getAdminsByFarmId(this.farmId).subscribe(data => {
      this.admins = data;
    })
  }

  private initializeEditFarmForm(farm: Farm) {
    this.editFarmForm = new FormGroup({
      "farmName": new FormControl(farm.name, Validators.required),
      "farmLocation": new FormControl(farm.location, Validators.required),
      "farmOwner": new FormControl(""),
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onEditFarm() {
    const editFarmFormValues = this.editFarmForm.value;

    const updatedFarm = new Farm(
      this.farmId,
      editFarmFormValues.farmLocation,
      editFarmFormValues.farmName
      )
    

    this.farmService.updateFarm(updatedFarm, this.farmId, editFarmFormValues.farmOwner).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.toggleEditMode();
      this.ngOnInit();
    }) 
  }



}
