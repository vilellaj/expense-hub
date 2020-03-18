import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeSpanish from '@angular/common/locales/es';
import localePortuguese from '@angular/common/locales/pt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionData } from '../models/sessiona-data';
import { User } from '../models/user';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    sessionData: SessionData;

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

    get user(): User {
        return this.sessionData ? this.sessionData.user : <User>{};
    }

    constructor(private http: HttpClient,
        private router: Router) {
        this.sessionData = this.obtersessionDataDoStorage() || {};
    }

    obtersessionDataDoStorage() {
        const dadosStorage = localStorage.getItem(environment.storageKeys.session);
        return dadosStorage ? JSON.parse(dadosStorage) : null;
    }

    saveSessionData(sessionData: SessionData) {
        localStorage.setItem(environment.storageKeys.session, JSON.stringify(sessionData));
        this.sessionData = sessionData;
    }

    clearData() {
        this.sessionData = <SessionData>{};
        localStorage.removeItem(environment.storageKeys.session);
    }

    loggedIn(): boolean {
        return localStorage.getItem(environment.storageKeys.session) !== null;
    }
}