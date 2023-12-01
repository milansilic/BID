import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {
    constructor(private router: Router, private authTokenService: AuthTokenService) { }

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        // @ts-ignore
        return this.authTokenService.isAuthenticated().then((authenticated: boolean) => {
            if (authenticated) {
                const user = JSON.parse(localStorage.getItem('User') as string);
                // this is temporary
                if (user.CompanyId === 11) {
                    this.router.navigate(['/master-user-welcome']);
                }
                return true;
            } else {
                this.router.navigate(['/login']);
            }
        });
    }
}
