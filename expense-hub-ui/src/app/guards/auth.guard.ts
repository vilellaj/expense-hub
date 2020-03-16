import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const resultado = localStorage
            .getItem(environment.storageKeys.dadosSessao);

        if (!resultado) {
            let redirect: string = '/auth/autenticar';
            this.router.navigate([redirect]);
        }

        return !resultado ? false : true;
    }
}