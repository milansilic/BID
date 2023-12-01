import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/components/custom-input/custom-input.component';
import { AuthTokenService } from 'src/authorization/services/auth-token.service';
import { ForgotPasswordModel } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  forgotPasswordForm: UntypedFormGroup;
  forgotPasswordModel = new ForgotPasswordModel();
  spinner = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get f() { return this.forgotPasswordForm.controls; }

  ngOnInit(): void {
    this.forgotPasswordModel = new ForgotPasswordModel();
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  submitForgotPasswordForm() {

    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.forgotPasswordModel = this.forgotPasswordForm.value;
    this.authService.forgotPassword(this.forgotPasswordModel)
      .subscribe(
        {
          next: (response) => {
            this.router.navigate(['/check-mail']);
          }, error: () => {

          }
        });
  }

}
