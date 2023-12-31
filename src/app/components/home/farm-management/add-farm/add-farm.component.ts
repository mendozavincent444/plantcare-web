import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FarmManagementService } from '../farm-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.css']
})
export class AddFarmComponent implements OnInit {

  addFarmForm: FormGroup;

  constructor(private farmService: FarmManagementService) { }

  ngOnInit(): void {
    this.addFarmForm = new FormGroup({
      "farmName": new FormControl(null, Validators.required),
      "location": new FormControl(null, Validators.required)
    });
  }

  get farmName() {
    return this.addFarmForm.controls["farmName"];
  }

  get location() {
    return this.addFarmForm.controls["location"];
  }

  onAddFarm() {
    const name = this.addFarmForm.value["farmName"];
    const location = this.addFarmForm.value["location"];

    this.farmService.addFarm(name, location).subscribe({
      next: data => {
        Swal.fire("Farm Added Successfully.", "Done", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });


    this.addFarmForm.reset();
  }

}
