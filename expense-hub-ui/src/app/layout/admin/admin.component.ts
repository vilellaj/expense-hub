import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    constructor(private _authService: AuthService,
        private _router: Router) {

    }

    signOut(event: Event) {
        if (event) {
            event.preventDefault();
        }

        Swal.fire({
            title: 'Sign out',
            text: "Do you really want to exit?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                this._authService.limparDados();
                this._router.navigate(['/auth']);
            }
        })

    }
}