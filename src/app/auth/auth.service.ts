import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordModel, CreateAccountModel, ForgotPasswordModel, ResetPasswordModel } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    createAccount(account: CreateAccountModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/User/Register`, account);
    }

    forgotPassword(forgotPassword: ForgotPasswordModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/ForgotPassword?email=${forgotPassword.email}`, null);
    }

    resetPassword(resetPassword: ResetPasswordModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/ResetPassword`, resetPassword);
    }

    changePassword(changePassword: ChangePasswordModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/ChangePassword`, changePassword);
    }

}