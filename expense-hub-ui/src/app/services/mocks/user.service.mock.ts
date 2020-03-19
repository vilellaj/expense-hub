import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { SessionData } from 'src/app/models/sessiona-data';

@Injectable()
export class UserServiceMock {
    authenticate(data): Observable<SessionData> {
        const sessionData = new SessionData();
        return of(sessionData);
    }

    // getById(id: number): Observable<Expense> {
    //     const url = `${this.baseURL}/${id}`;
    //     return this._http.get<Expense>(url, this._sharedService.httpOptions);
    // }

    // add(data): Observable<IMessageResult> {
    //     const url = `${this.baseURL}`;
    //     return this._http.post<IMessageResult>(url, data, this._sharedService.httpOptions);
    // }

    // update(data): Observable<IMessageResult> {
    //     const url = `${this.baseURL}/${data.id}`;
    //     return this._http.put<IMessageResult>(url, data, this._sharedService.httpOptions);
    // }

    // delete(id: number): Observable<IMessageResult> {
    //     const url = `${this.baseURL}/${id}`;
    //     return this._http.delete<IMessageResult>(url, this._sharedService.httpOptions);
    // }
}
