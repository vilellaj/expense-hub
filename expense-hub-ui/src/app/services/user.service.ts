import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionData } from '../models/sessiona-data';
import { SharedService } from './shared.service';

@Injectable()
export class UserService {

    baseURL = `${environment.apiUrl}/users`;

    constructor(private _http: HttpClient, private _sharedService: SharedService) { }

    authenticate(data): Observable<SessionData> {
        const url = `${this.baseURL}/auth`;
        return this._http.post<SessionData>(url, data, this._sharedService.httpOptions);
    }
}
