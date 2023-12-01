import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/components/custom-input/custom-input.component';
import { AuthTokenService } from 'src/authorization/services/auth-token.service';
import { ResetPasswordModel } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  newPasswordForm: UntypedFormGroup;
  newPasswordModel = new ResetPasswordModel();
  resetCode: string | null;
  spinner = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

    this.resetCode = this.activatedRoute.snapshot.paramMap.get('reset-code');
  }

  get f() { return this.newPasswordForm.controls; }

  ngOnInit(): void {
    this.newPasswordModel = new ResetPasswordModel();
    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.required]
    });
  }

  submitnewPasswordForm() {
    this.newPasswordForm.markAllAsTouched();

    if (this.newPasswordForm.invalid) {
      return;
    }

    this.newPasswordModel = this.newPasswordForm.value;

    if (this.newPasswordModel.newPassword !== this.newPasswordModel.confirmPassword) {
      // this.toastr.error("Confirm password is invalid.");
      return;
    }

    this.newPasswordModel.resetCode = this.resetCode as string;
    this.authService.resetPassword(this.newPasswordModel)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        }, error: () => {

        }
      });
  }

}
