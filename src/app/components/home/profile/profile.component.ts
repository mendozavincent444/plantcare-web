import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
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

    this.user = this.userService.getUser();

    this.editUserForm = new FormGroup({
      "username": new FormControl(this.user.username, [Validators.required]),
      "emailAddress": new FormControl(this.user.email, [Validators.required]),
      "firstName": new FormControl(this.user.firstName, [Validators.required]),
      "lastName": new FormControl(this.user.lastName, [Validators.required]),
    });

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
    throw new Error('Method not implemented.');
  }

  toggleEditMode(): void {
    this.editUserMode = !this.editUserMode;
  }

  toggleChangePasswordMode() {
    this.changePasswordMode = !this.changePasswordMode;
  }
}
