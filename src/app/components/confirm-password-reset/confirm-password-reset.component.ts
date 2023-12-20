import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordRequestDto } from 'src/app/shared/payload/forgot-password-request-dto';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit, OnDestroy {
  token: string;
  confirmPasswordRequestForm: FormGroup;
  private originalBackgroundColor: string;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.originalBackgroundColor = document.body.style.background;
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }

  private resetBackgroundColor(): void {
    document.body.style.background = this.originalBackgroundColor;
  }

  ngOnInit(): void {
    this.confirmPasswordRequestForm = new FormGroup({
      "newPassword": new FormControl(null, Validators.required),
      "confirmNewPassword": new FormControl(null, Validators.required)
    });

    this.token = this.route.snapshot.queryParams["token"];
  }

  ngOnDestroy(): void {
    this.resetBackgroundColor();
  }

  get newPasswordValue() {
    return this.confirmPasswordRequestForm.controls["newPassword"].value;
  }

  get confirmNewPasswordValue() {
    return this.confirmPasswordRequestForm.controls["confirmNewPassword"].value;
  }

  public get newPassword() {
    return this.confirmPasswordRequestForm.controls["newPassword"];
  }

  public get confirmNewPassword() {
    return this.confirmPasswordRequestForm.controls["confirmNewPassword"];
  }

  onResetPassword() {

    const forgotPasswordRequestDto = new ForgotPasswordRequestDto();
    forgotPasswordRequestDto.newPassword = this.newPasswordValue;

    /*
    this.authService.confirmPasswordRequest(this.token, forgotPasswordRequestDto).subscribe(data => {
      // fix - receive data 
      console.log(data);
      this.confirmPasswordRequestForm.reset();
    });*/

    this.authService.confirmPasswordRequest(this.token, forgotPasswordRequestDto).subscribe({
      next: data => {
        this.confirmPasswordRequestForm.reset();
        Swal.fire(data.message, "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });
  }
}
