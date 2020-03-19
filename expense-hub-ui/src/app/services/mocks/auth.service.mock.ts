import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceMock {
    get user(): User {
        return <User>{};
    }
}