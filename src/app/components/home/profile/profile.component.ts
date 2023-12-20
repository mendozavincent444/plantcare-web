import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { EditUserProfileDto } from 'src/app/shared/payload/edit-user-profile-dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FarmManagementService } from '../farm-management/farm-management.service';
import { Farm } from 'src/app/shared/models/farm';
import { SubscriptionService } from '../subscription/subscription.service';
import { Subscription } from 'src/app/shared/models/subscription';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  farms: Farm[];
  editUserForm: FormGroup
  changePasswordForm: FormGroup;
  changeFarmForm: FormGroup;
  user!: User;
  subscription: Subscription;

  editUserMode!: boolean;
  changePasswordMode!: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private farmService: FarmManagementService,
    private subscriptionService: SubscriptionService
  ) {

  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user);
    this.initializeEditUserForm();
    this.initializeChangePasswordForm();
    this.initializeChangeFarmForm();
    this.subscriptionService.getSubscription().subscribe(data => this.subscription = data);

    this.farmService.getAllFarms().subscribe(farms => {
      this.farms = farms;
    });


    this.editUserMode = false;
    this.changePasswordMode = false;
  }


  private initializeChangeFarmForm() {
    this.changeFarmForm = new FormGroup({
      "farm": new FormControl("")
    });
  }

  private initializeEditUserForm(): void {
    this.editUserForm = new FormGroup({
      "firstName": new FormControl(this.user.firstName, [Validators.required]),
      "lastName": new FormControl(this.user.lastName, [Validators.required])
    });
  }

  private initializeChangePasswordForm(): void {
    this.changePasswordForm = new FormGroup({
      "currentPassword": new FormControl(null, [Validators.required]),
      "newPassword": new FormControl(null, [Validators.required])
    });
  }

  get firstName() {
    return this.editUserForm.controls["firstName"];
  }

  get lastName() {
    return this.editUserForm.controls["lastName"];
  }

  get currentPassword() {
    return this.changePasswordForm.controls["currentPassword"];
  }

  get newPassword() {
    return this.changePasswordForm.controls["newPassword"];
  }

  onChangeFarm() {
    const farm = this.changeFarmForm.value["farm"];
    this.farmService.saveFarm(farm);
  }


  onChangePassword() {
    const currentPassword = this.changePasswordForm.value["currentPassword"];
    const newPassword = this.changePasswordForm.value["newPassword"];
    const device = "Web";

    this.authService.updatePassword(currentPassword, newPassword, device).subscribe({
      next: data => {
        this.changePasswordForm.reset();
        this.toggleChangePasswordMode();
        Swal.fire(data.message, "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });
  }

  onSaveInfo() {
    const firstName = this.editUserForm.value["firstName"];
    const lastName = this.editUserForm.value["lastName"];


    const editedUserProfile: EditUserProfileDto = new EditUserProfileDto(
      firstName,
      lastName
    );

    this.authService.updateUserProfile(editedUserProfile).subscribe({
      next: data => {
        this.userService.saveUser(data);
        this.editUserForm.reset();
        this.toggleEditUserMode;
        this.ngOnInit();
        Swal.fire(data.message, "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });


  }

  isRoleAdmin(): boolean {
    return this.user.role === "ROLE_ADMIN" ? true : false;
  }

  isRoleSuperAdmin(): boolean {
    return this.user.role === "ROLE_SUPERADMIN" ? true : false;
  }

  isSubscribed(): boolean {
    return this.subscription != null;
  }

  cancelSubscription() {
    this.subscriptionService.cancelSubscription().subscribe();
    this.ngOnInit();
    window.location.reload();
  }


  toggleEditUserMode(): void {
    this.editUserMode = !this.editUserMode;
  }

  toggleChangePasswordMode() {
    this.changePasswordMode = !this.changePasswordMode;
  }
}
