/* istanbul ignore file */
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { environment } from '../../environments/environment';
// import { UserRole } from '../../app/components/users/users.model';


@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  public token: string;

  private userSignInUrl = `${environment.apiUrl}/Authentication/login`;

  static tokenHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUserEmail(): any {
    return JSON.parse(<string>localStorage.getItem('User Email'));
  }

  static getToken(): string | null {
    if (sessionStorage.getItem('Token') === null) {
      return localStorage.getItem('Token');
    } else {
      return sessionStorage.getItem('Token');
    }
  }

  static getParsedToken() {
    if (sessionStorage.getItem('Token') !== null) {
      return <string>sessionStorage.getItem('Token');
    } else if (localStorage.getItem('Token') !== null) {
      return <string>localStorage.getItem('Token');
    }
  }

  static getParsedTokenNew() {
    if (sessionStorage.getItem('Token_new') !== null) {
      return <string>sessionStorage.getItem('Token_new');
    } else if (localStorage.getItem('Token_new') !== null) {
      return <string>localStorage.getItem('Token_new');
    }
  }

  getUserId() {
    const jsonUser = JSON.parse(<string>localStorage.getItem('User'));
    return jsonUser.id;
  }

  getUser() {
    return JSON.parse(<string>localStorage.getItem('User'));
  }

  static getTokenInfo(): any {
    try {
      const jwt = localStorage.getItem('Token');

      return this.tokenHelper.decodeToken(<string>jwt);
    } catch (error) {
      return null;
    }
  }

  private handleError(error: any) {
    let errMsg: string;
    if (error) {
      const body = error || '';
      const err = body || JSON.stringify(body);
      errMsg = err.error.error;
    } else {
      errMsg = error.error.error;
    }
    // this.toastr.toastrConfig.preventDuplicates = true;
    // if (error.error.description) {
    //   this.toastr.error(error.error.description, 'Error', {
    //     disableTimeOut: true,
    //   });
    // } else {
    //   this.toastr.error(error.error.errors, 'Error', { disableTimeOut: true });
    // }

    return throwError({ status: error.status, message: errMsg });
  }

  isAuthenticated(): Promise<unknown> {
    return new Promise((resolve) => {
      resolve(AuthTokenService.getToken());
    });
  }

  login(loginInfo: { email: string; password: string }) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.userSignInUrl, loginInfo, { headers })
      .pipe(
        map((response: any) => {
          const {
            token,
            refreshToken
          } = response;
          localStorage.setItem(
            'User',
            JSON.stringify(
              AuthTokenService.tokenHelper.decodeToken(token)
            )
          );
          console.log(JSON.stringify(
            AuthTokenService.tokenHelper.decodeToken(token)
          ));
          localStorage.setItem('Token', token);
          localStorage.setItem('RefreshToken', refreshToken);
          if (token) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((error) => {
          this.handleError(error);
          throw new Error();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('User');
  }

  saveMetaDataToStorage(response) {
    localStorage.setItem('User', JSON.stringify(response.user));
    localStorage.setItem('Token', response.token);
  }
}
