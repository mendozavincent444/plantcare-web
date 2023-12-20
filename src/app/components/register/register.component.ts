import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequestDto } from 'src/app/shared/payload/registerrequestdto';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private originalBackgroundColor: string;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.originalBackgroundColor = document.body.style.background;
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }

  private resetBackgroundColor(): void {
    document.body.style.background = this.originalBackgroundColor;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      "repeatPassword": new FormControl(null, Validators.required),
    });
  }

  get firstName() {
    return this.registerForm.controls["firstName"];
  }

  get lastName() {
    return this.registerForm.controls["lastName"];
  }

  get email() {
    return this.registerForm.controls["email"];
  }

  get username() {
    return this.registerForm.controls["username"];
  }

  get password() {
    return this.registerForm.controls["password"];
  }

  get repeatPassword() {
    return this.registerForm.controls["repeatPassword"];
  }

  ngOnDestroy(): void {
    this.resetBackgroundColor();
  }


  onSubmit() {
    const USER_ROLE = "ROLE_ADMIN";

    let firstName, lastName, email, username, password;

    email = this.registerForm.value["email"];
    username = this.registerForm.value["username"];
    firstName = this.registerForm.value["firstName"];
    lastName = this.registerForm.value["lastName"];
    password = this.registerForm.value["password"];

    this.authService.register(new RegisterRequestDto(
      email,
      username,
      firstName,
      lastName,
      password,
      USER_ROLE
    )).subscribe({
      next: data => {
        this.registerForm.reset();
        this.router.navigate(["/login"]);
        Swal.fire(data.message, "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }});
  }

  isPasswordsEqual(): boolean {
    let password: string = this.registerForm.value["password"];
    let repeatPassword: string = this.registerForm.value["repeatPassword"];

    return password === repeatPassword ? true : false;
  }


}
