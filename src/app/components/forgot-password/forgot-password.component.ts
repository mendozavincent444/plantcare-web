import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordRequestDto } from 'src/app/shared/payload/forgot-password-request-dto';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotPasswordRequestForm: FormGroup;
  private originalBackgroundColor: string;


  constructor(private authService: AuthService) {
    this.originalBackgroundColor = document.body.style.background;
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }
  

  private resetBackgroundColor(): void {
    document.body.style.background = this.originalBackgroundColor;
  }

  ngOnInit(): void {
    this.forgotPasswordRequestForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnDestroy(): void {
    this.resetBackgroundColor();
  }

  onSubmitRequest() {
    const email = this.forgotPasswordRequestForm.value["email"];

    const forgotPasswordRequestDto = new ForgotPasswordRequestDto();
    forgotPasswordRequestDto.email = email;

    this.authService.forgotPasswordRequest(forgotPasswordRequestDto).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.forgotPasswordRequestForm.reset();
    });

  }
}
