import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _router: Router,
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

        setTimeout(() => {
            this._spinner.hide();
            this._authService.salvarDadosSessao({});
            this._router.navigate(['']);
        }, 3000)
    }
}