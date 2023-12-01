import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authTokenService: AuthTokenService) { }

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        // @ts-ignore
        return this.authTokenService.isAuthenticated().then((authenticated: boolean) => {
            if (!authenticated) {
                this.authTokenService.logout();
                this.router.navigate(['/sign-in']);
                return false;
            }
            return true;
        });
    }
}
