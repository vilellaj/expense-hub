import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SwalService } from 'src/app/shared/swal.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService, TranslatePipe]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    param = { value: 'world' };

    constructor(private _formBuilder: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _router: Router,
        private _userService: UserService,
        public _authService: AuthService,
        private _translate: TranslateService,
        private _translatePipe: TranslatePipe,
        private _swalService: SwalService) {
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
                let message = this._translatePipe.transform('DefaultError');

                if (err instanceof HttpErrorResponse && err.status == 401) {
                    message = this._translatePipe.transform('Wrong user')
                }

                this._swalService.error(
                    this._translatePipe.transform('Error'),
                    message
                )
            })
    }

    setLang(lang): void {
        localStorage.setItem(environment.storageKeys.lang, lang);
        this._translate.use(lang);
    }

    isCurrentLang(lang): boolean {
        return lang === this._translate.store.currentLang;
    }
}