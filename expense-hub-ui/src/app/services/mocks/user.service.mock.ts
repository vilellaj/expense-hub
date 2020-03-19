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
}
