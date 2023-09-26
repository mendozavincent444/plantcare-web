import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequestDto } from 'src/app/shared/payload/registerrequestdto';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService
  ) {
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "email": new FormControl(null, [Validators.required]),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      "repeatPassword": new FormControl(null, Validators.required),
    });
  }


  onSubmit() {
    const USER_ROLE = "ROLE_FARMER";

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

        // fix - receive message

        console.log(data);

        this.registerForm.reset();

        
        
      }});
  }

  isPasswordsEqual(): boolean {
    let password: string = this.registerForm.value["password"];
    let repeatPassword: string = this.registerForm.value["repeatPassword"];

    return password === repeatPassword ? true : false;
  }


}
