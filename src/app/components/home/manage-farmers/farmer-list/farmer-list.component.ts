import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageFarmersService } from '../manage-farmers.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Farm } from 'src/app/shared/models/farm';
import { FarmListComponent } from '../../farm-management/farm-list/farm-list.component';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.css']
})
export class FarmerListComponent {

  farmerListForm: FormGroup;
  farmers!: User[];
  farms: Farm[];

  constructor(
    private manageFarmersService: ManageFarmersService,
    private farmService: FarmManagementService
  ) {

  }
  ngOnInit(): void {

    this.farmerListForm = new FormGroup({
      "farm": new FormControl("")
    });

    this.farmService.getAllFarms().subscribe(data => {
      this.farms = data;
    });
  }

  onChangeFarm() {
    const farmId = this.farmerListForm.value["farm"];

    this.manageFarmersService.getAllFarmersByFarmId(farmId).subscribe(data => {
      this.farmers = data;
    })
  }

  onDeleteFarmer(farmerId: number) {
    const farmId = this.farmerListForm.value["farm"];


    this.manageFarmersService.deleteFarmerByFarm(farmId, farmerId).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.ngOnInit();
    });


  }
}
