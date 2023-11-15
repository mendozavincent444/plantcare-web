import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordRequestDto } from 'src/app/shared/payload/forgot-password-request-dto';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {


  token: string;
  confirmPasswordRequestForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
    ) {
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }

  ngOnInit(): void {
    this.confirmPasswordRequestForm = new FormGroup({
      "newPassword": new FormControl(null, Validators.required),
      "confirmNewPassword": new FormControl(null, Validators.required)
    });

    this.token = this.route.snapshot.queryParams["token"];
  }

  public get newPassword() {
    return this.confirmPasswordRequestForm.controls["newPassword"].value;
  }

  public get confirmNewPassword() {
    return this.confirmPasswordRequestForm.controls["confirmNewPassword"].value;
  }

  isEqualPasswords() {
    return this.newPassword === this.confirmNewPassword;
  }

  onResetPassword() {
    
    const forgotPasswordRequestDto = new ForgotPasswordRequestDto();
    forgotPasswordRequestDto.newPassword = this.newPassword;

    this.authService.confirmPasswordRequest(this.token, forgotPasswordRequestDto).subscribe(data => {
      // fix - receive data 
      console.log(data);
      this.confirmPasswordRequestForm.reset();
    });
  }
}
