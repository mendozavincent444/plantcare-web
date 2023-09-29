import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { RegisterRequestDto } from 'src/app/shared/payload/registerrequestdto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

const USER_ROLE = "ROLE_FARMER";

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent implements OnInit {
  addFarmerForm: FormGroup;

  farms: Farm[];

  constructor(
    private farmService: FarmManagementService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  onUploadFarmers() {
    document.getElementById('fileInput')?.click();
  }

  ngOnInit(): void {
    this.addFarmerForm = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "emailAddress": new FormControl(null, [Validators.required, Validators.email]),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      "farm": new FormControl("")
    });

    this.farmService.getAllFarms().subscribe(farms => this.farms = farms);
  }

  onAddFarmer() {
    const emailAddress = this.addFarmerForm.value["emailAddress"];
    const username = this.addFarmerForm.value["username"];
    const firstName = this.addFarmerForm.value["firstName"];
    const lastName = this.addFarmerForm.value["lastName"];
    const password = this.addFarmerForm.value["password"];
    const farmId = this.addFarmerForm.value["farm"];

    const registerRequest = new RegisterRequestDto(
      emailAddress,
      username,
      firstName,
      lastName,
      password,
      USER_ROLE,
      farmId
    );

    this.authService.register(registerRequest).subscribe(data => {
      // fix receive data 
      console.log(data);
      this.addFarmerForm.reset();
      this.router.navigate(["../farmer-list"], { relativeTo: this.route });
    })

    
    
  }

}
