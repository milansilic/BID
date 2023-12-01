import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from 'src/app/shared/components/custom-input/custom-input.component';
import { AuthTokenService } from 'src/authorization/services/auth-token.service';
import { LoginModel } from '../auth.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  loginForm: UntypedFormGroup;
  loginModel = new LoginModel();
  spinner = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authTokenService: AuthTokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginModel = new LoginModel();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  submitLoginForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }
    this.spinner = true;
    this.loginModel = this.loginForm.value;
    this.authTokenService.login({ email: this.loginModel.email, password: this.loginModel.password })
      .subscribe((response: any) => {
        this.router.navigate(['layout/users']);
        this.spinner = false;
      }, err => {
        this.spinner = false;
        this.toastr.error('Username or password not correct.')
        console.error(err);
      });
  }

}
