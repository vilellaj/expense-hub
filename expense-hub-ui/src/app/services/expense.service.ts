import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable()
export class ExpenseService {

    baseURL = `${environment.apiUrl}/expenses`;

    constructor(private _http: HttpClient, private _sharedService: SharedService) { }

    getAll() {
        const url = `${this.baseURL}`;
        return this._http.get<any>(url, this._sharedService.httpOptions);
    }

    getById(id: number) {
        const url = `${this.baseURL}/${id}`;
        return this._http.get<any>(url, this._sharedService.httpOptions);
    }

    add(data) {
        const url = `${this.baseURL}`;
        return this._http.post<any>(url, data, this._sharedService.httpOptions);
    }

    update(data) {
        const url = `${this.baseURL}/${data.id}`;
        return this._http.put<any>(url, data, this._sharedService.httpOptions);
    }

    delete(id: number) {
        const url = `${this.baseURL}/${id}`;
        return this._http.delete<any>(url, this._sharedService.httpOptions);
    }
}
