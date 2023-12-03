import { Component } from '@angular/core';
import { ManageFarmersService } from '../manage-farmers.service';
import { User } from 'src/app/shared/models/user';
import { Farm } from 'src/app/shared/models/farm';
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
  farm: Farm;

  constructor(
    private manageFarmersService: ManageFarmersService,
    private farmService: FarmManagementService
  ) {

  }
  ngOnInit(): void {

    this.initializeFarmerListForm();

    this.farmService.getCurrentFarm().subscribe(farm => {
      this.getAllFarmersFromCurrentFarm(farm);
      this.farm = farm;
    });
  }

  private getAllFarmersFromCurrentFarm(farm: Farm) {
    this.manageFarmersService.getAllFarmersByFarmId(farm.id).subscribe(data => {
      this.farmers = data;
    });
  }

  private initializeFarmerListForm() {
    this.farmerListForm = new FormGroup({
      "farm": new FormControl("")
    });
  }


  onDeleteFarmer(farmerId: number) {
    const farmId = this.farm.id;


    this.manageFarmersService.deleteFarmerByFarm(farmId, farmerId).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.ngOnInit();
    });


  }
}
