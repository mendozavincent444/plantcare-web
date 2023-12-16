import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FarmManagementService } from '../home/farm-management/farm-management.service';
import { Farm } from 'src/app/shared/models/farm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private originalBackgroundColor: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private farmService: FarmManagementService,
    private route: ActivatedRoute
  ) {
    this.originalBackgroundColor = document.body.style.background;
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }

  private resetBackgroundColor(): void {
    document.body.style.background = this.originalBackgroundColor;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.resetBackgroundColor();
  }

  onSubmit() {

    const username = this.loginForm.value["username"];
    const password = this.loginForm.value["password"];
    const device = "Web"; 

    this.authService.login(username, password, device).subscribe({
      next: data => {
        this.userService.saveUser(data);
        this.loginForm.reset();
        this.getDefaultFarm();
      },
      error: err => {
        // fix - error message
      }
    });
  }

  private getDefaultFarm() {
    this.farmService.getAllFarms().subscribe(farms => {
      this.saveCurrentInitialFarm(farms);
      this.router.navigate(["/home/profile"]);
    });
  }

  private saveCurrentInitialFarm(farms: Farm[]): void {
    const farm = farms.at(0) ? farms.at(0) : null;
    this.farmService.saveFarm(farm);
  }





}
