import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService
    ) {
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required])
    });
  }


  onSubmit() {
    let username: string, password: string;

    username = this.loginForm.value["username"];
    password = this.loginForm.value["password"];

  
    this.authService.login(username, password).subscribe({
      next: data => {
        this.userService.saveUser(data);
        
        this.loginForm.reset();

      },
      error: err => {
        // fix - error message
      }
    })
  }





}
