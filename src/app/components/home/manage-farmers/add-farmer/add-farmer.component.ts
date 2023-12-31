import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Farm } from 'src/app/shared/models/farm';
import { FarmManagementService } from '../../farm-management/farm-management.service';
import { RegisterRequestDto } from 'src/app/shared/payload/registerrequestdto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

const USER_ROLE = "ROLE_FARMER";

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent implements OnInit {

  addFarmerForm: FormGroup;
  addFarmerBulkForm: FormGroup;
  formData: FormData;

  farms: Farm[];

  constructor(
    private farmService: FarmManagementService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onUploadFarmers(event) {
    if (!event.target.files[0]) {
      return;
    }

    const file = event.target.files[0];

    console.log(file);

    this.formData = new FormData();
    this.formData.append("file", file);
  }

  ngOnInit(): void {
    this.initializeAddFarmerForm();
    this.initializeAddFarmerBulkForm();

    this.farmService.getAllFarms().subscribe(farms => this.farms = farms);
  }


  private initializeAddFarmerForm() {
    this.addFarmerForm = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "emailAddress": new FormControl(null, [Validators.required, Validators.email]),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      "farm": new FormControl("")
    });
  }

  get firstName() {
    return this.addFarmerForm.controls["firstName"];
  }

  get lastName() {
    return this.addFarmerForm.controls["lastName"];
  }

  get emailAddress() {
    return this.addFarmerForm.controls["emailAddress"];
  }

  get username() {
    return this.addFarmerForm.controls["username"];
  }

  get password() {
    return this.addFarmerForm.controls["password"];
  }

  private initializeAddFarmerBulkForm() {
    this.addFarmerBulkForm = new FormGroup({
      "farmBulk": new FormControl("", Validators.required)
    });
  }

  onAddFarmer() {
    const farmId = this.addFarmerForm.value["farm"];

    const emailAddress = this.addFarmerForm.value["emailAddress"];
    const username = this.addFarmerForm.value["username"];
    const firstName = this.addFarmerForm.value["firstName"];
    const lastName = this.addFarmerForm.value["lastName"];
    const password = this.addFarmerForm.value["password"];

    const registerRequest = new RegisterRequestDto(
      emailAddress,
      username,
      firstName,
      lastName,
      password,
      USER_ROLE,
      farmId
    );

    this.authService.register(registerRequest).subscribe({
      next: data => {
        this.addFarmerForm.reset();
        this.router.navigate(["../farmer-list"], { relativeTo: this.route });
        Swal.fire(data.message, "Success", "success");
      }, error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });

  }

  onAddFarmersBulk() {
    const farmId = this.addFarmerBulkForm.value["farmBulk"];

    this.authService.registerFarmersBulk(farmId, this.formData).subscribe({
      next: data => {
        this.addFarmerForm.reset();
        this.router.navigate(["../farmer-list"], { relativeTo: this.route });
        Swal.fire("Farmers registered successfully.", "Success", "success");
      }, error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    })

  }
}
