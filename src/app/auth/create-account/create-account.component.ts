import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/components/custom-input/custom-input.component';
import { AuthTokenService } from 'src/authorization/services/auth-token.service';
import { CreateAccountModel } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  createAccountForm: UntypedFormGroup;
  createAccountModel = new CreateAccountModel();
  spinner = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authTokenService: AuthTokenService,
    private router: Router,
    private authService: AuthService
  ) { }

  get f() { return this.createAccountForm.controls; }

  ngOnInit(): void {
    this.createAccountModel = new CreateAccountModel();
    this.createAccountForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submitCreateAccountForm() {

    this.createAccountForm.markAllAsTouched();
    console.log(this.createAccountForm);
    if (this.createAccountForm.invalid) {
      return;
    }

    this.createAccountModel = this.createAccountForm.value;
    console.log(this.createAccountModel);
    if (this.createAccountModel.password !== this.createAccountModel.confirmPassword) {
      // this.toastr.error("Confirm password is invalid.");
      return;
    }

    this.authService.createAccount(this.createAccountModel)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/check-mail']);
        }, error: () => {

        }
      });
  }

}
