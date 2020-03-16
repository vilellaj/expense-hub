import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import { SharedService } from '../shared.service';

@Injectable()
export class AuthService implements HttpService {

    baseURL = `${environment.URL_API}/users`;

    constructor(private _http: HttpClient, private _sharedService: SharedService) { }

    authenticate(username: string, password: string) {
        const url = `${this.baseURL}/auth`;
        return this._http.post<any>(url, this._sharedService.httpOptions);
    }
}
