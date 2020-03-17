import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const sessionData = localStorage
            .getItem(environment.storageKeys.session);

        if (!sessionData) {
            this.router.navigate(['/auth']);
        }

        return !sessionData ? false : true;
    }
}