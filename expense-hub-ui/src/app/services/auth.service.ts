import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import localePortuguese from '@angular/common/locales/pt';
import localeSpanish from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    sessionData: any;

    private _locale: string;

    set locale(value: string) {
        this._locale = value;
    }
    get locale(): string {
        return this._locale || 'en-US';
    }

    registerCulture(culture: string) {
        if (!culture) {
            return;
        }
        this.locale = culture;

        // Register locale data since only the en-US locale data comes with Angular
        switch (culture) {
            case 'pt-BR': {
                registerLocaleData(localePortuguese);
                break;
            }
            case 'es-ES': {
                registerLocaleData(localeSpanish);
                break;
            }
        }
    }

    get token(): string {
        return this.sessionData.token;
    }

    get user(): any {
        return this.sessionData ? this.sessionData.user : <any>{};
    }

    constructor(private http: HttpClient,
        private router: Router) {
        this.sessionData = this.obtersessionDataDoStorage() || {};
    }

    obtersessionDataDoStorage() {
        const dadosStorage = localStorage.getItem(environment.storageKeys.session);
        return dadosStorage ? JSON.parse(dadosStorage) : null;
    }

    saveSessionData(sessionData: any) {
        localStorage.setItem(environment.storageKeys.session, JSON.stringify(sessionData));
        this.sessionData = sessionData;
    }

    clearData() {
        this.sessionData = <any>{};
        localStorage.removeItem(environment.storageKeys.session);
    }

    loggedIn(): boolean {
        return localStorage.getItem(environment.storageKeys.session) !== null;
    }
}