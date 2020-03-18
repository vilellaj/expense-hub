import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable()
export class UserService {

    baseURL = `${environment.apiUrl}/users`;

    constructor(private _http: HttpClient, private _sharedService: SharedService) { }

    authenticate(data) {
        const url = `${this.baseURL}/auth`;
        return this._http.post<any>(url, data, this._sharedService.httpOptions);
    }
}
