import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordRequestDto } from 'src/app/shared/payload/forgot-password-request-dto';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordRequestForm: FormGroup;

  constructor(private authService: AuthService) {
    document.body.style.background = 'rgba(23, 122, 23, 0.6)';
  }

  ngOnInit(): void {
    this.forgotPasswordRequestForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email])
    });
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
