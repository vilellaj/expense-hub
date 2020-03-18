import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [TranslatePipe]
})
export class AdminComponent {
    constructor(private _authService: AuthService,
        private _router: Router,
        private _translatePipe: TranslatePipe) {

    }

    signOut(event: Event) {
        if (event) {
            event.preventDefault();
        }

        Swal.fire({
            title: this._translatePipe.transform('SignOut'),
            text: this._translatePipe.transform('ExitQuestion'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this._translatePipe.transform('No'),
            confirmButtonText: this._translatePipe.transform('Yes')
        }).then((result) => {
            if (result.value) {
                this._authService.clearData();
                this._router.navigate(['/auth']);
            }
        })
    }
}