import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';
import { Expense } from '../models/expense';
import { Observable } from 'rxjs';
import { IMessageResult } from '../models/message-result';

@Injectable()
export class ExpenseService {

    baseURL = `${environment.apiUrl}/expenses`;

    constructor(private _http: HttpClient, private _sharedService: SharedService) { }

    getAll(): Observable<Array<Expense>> {
        const url = `${this.baseURL}`;
        return this._http.get<Array<Expense>>(url, this._sharedService.httpOptions);
    }

    getById(id: number): Observable<Expense> {
        const url = `${this.baseURL}/${id}`;
        return this._http.get<Expense>(url, this._sharedService.httpOptions);
    }

    add(data): Observable<IMessageResult> {
        const url = `${this.baseURL}`;
        return this._http.post<IMessageResult>(url, data, this._sharedService.httpOptions);
    }

    update(data): Observable<IMessageResult> {
        const url = `${this.baseURL}/${data.id}`;
        return this._http.put<IMessageResult>(url, data, this._sharedService.httpOptions);
    }

    delete(id: number): Observable<IMessageResult> {
        const url = `${this.baseURL}/${id}`;
        return this._http.delete<IMessageResult>(url, this._sharedService.httpOptions);
    }
}
