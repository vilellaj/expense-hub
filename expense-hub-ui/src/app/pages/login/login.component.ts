import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _router: Router,
        private _userService: UserService,
        public _authService: AuthService) {
        this.buildForm();
    }

    buildForm(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this._authService.loggedIn()) {
            this._router.navigate([''])
        }
    }

    login(): void {
        this._spinner.show();

        this._userService.authenticate(this.loginForm.value)
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                this._authService.saveSessionData(res);
                this._router.navigate(['']);
            }, (err) => {
                let message = 'Something went wrong!';

                if (err instanceof HttpErrorResponse && err.status == 401) {
                    message = 'Wrong user and/or password'
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                });
            })
    }
}