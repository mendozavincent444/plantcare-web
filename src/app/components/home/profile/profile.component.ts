import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { EditUserProfileDto } from 'src/app/shared/payload/edit-user-profile-dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editUserForm: FormGroup
  changePasswordForm: FormGroup;
  user!: User;

  editUserMode!: boolean;
  changePasswordMode!: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.editUserMode = false;
    this.changePasswordMode = false;

    this.userService.getUser().subscribe(user => this.user = user);

    this.initializeEditUserForm();
    this.initializeChangePasswordForm();
  }

  private initializeEditUserForm(): void {
    this.editUserForm = new FormGroup({
      "firstName": new FormControl(this.user.firstName, [Validators.required]),
      "lastName": new FormControl(this.user.lastName, [Validators.required])
    });
  }

  private initializeChangePasswordForm(): void {
    this.changePasswordForm = new FormGroup({
      "currentPassword": new FormControl(null),
      "newPassword": new FormControl(null)
    });
  }


  onChangePassword() {
    const currentPassword = this.changePasswordForm.value["currentPassword"];
    const newPassword = this.changePasswordForm.value["newPassword"];

    this.authService.updatePassword(currentPassword, newPassword).subscribe(data => {

      // fix - recieve message
      console.log(data);

      this.changePasswordForm.reset();
      this.toggleChangePasswordMode();
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
      next: (data) => {
        this.userService.saveUser(data);
        this.editUserForm.reset();
        this.toggleEditUserMode;
        this.ngOnInit();
      }});
    

  }

  toggleEditUserMode(): void {
    this.editUserMode = !this.editUserMode;
  }

  toggleChangePasswordMode() {
    this.changePasswordMode = !this.changePasswordMode;
  }
}
