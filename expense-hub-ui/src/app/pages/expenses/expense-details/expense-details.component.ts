import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Expense } from 'src/app/models/expense';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { SwalService } from 'src/app/shared/swal.service';
import * as moment from 'moment';
import { DateUtil } from 'src/app/util/date.util';

@Component({
    selector: 'app-expense-details',
    templateUrl: './expense-details.component.html',
    styleUrls: ['./expense-details.component.scss'],
    providers: [TranslatePipe]
})
export class ExpenseDetailsComponent implements OnInit {
    public id: string;
    public expense: Expense;
    public expenseForm: FormGroup;
    public action: string;

    constructor(private _spinner: NgxSpinnerService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _expenseService: ExpenseService,
        private _formBuilder: FormBuilder,
        private _translate: TranslateService,
        private _authService: AuthService,
        private _translatePipe: TranslatePipe,
        private _swalService: SwalService) {
        this.buildForm();
    }

    buildForm(expense: Expense = new Expense()): void {
        let date = DateUtil
            .getStringFromISO(expense.date, this._translate.store.currentLang);

        this.expenseForm = this._formBuilder.group({
            description: [expense.description, Validators.required],
            value: [expense.value, Validators.compose([
                Validators.required,
                Validators.min(0.01)
            ])],
            date: [date, Validators.compose([
                Validators.required,
                Validators.minLength(10)
            ])],
            userId: [this._authService.user.id]
        })
    }

    ngOnInit(): void {
        if (this._route.snapshot.params['id']) {
            this.action = this._translatePipe.transform('Update');
            this.id = this._route.snapshot.params['id'];
            this.load();
        } else {
            this.action = this._translatePipe.transform('Save')
        }
    }

    load(): void {
        this._spinner.show();
        this._expenseService.getById(parseInt(this.id))
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                this.expense = res;
                this.buildForm(this.expense);
            }, (err) => {
                this._swalService.error(
                    this._translatePipe.transform('Error'),
                    this._translatePipe.transform('DefaultError')
                );
            })
    }

    addOrUpdate(): void {
        const id = parseInt(this.id);
        const value = this.expenseForm.value;

        value.date = DateUtil
            .getISOFromString(value.date, this._translate.store.currentLang);

        if (id > 0) {
            value.id = id;
            this.update(value);
        } else {
            this.add(value);
        }
    }

    add(value: any): void {
        this._spinner.show();
        this._expenseService.add(value)
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                this._swalService.success(
                    this._translatePipe.transform('Success'),
                    this._translatePipe.transform('ItemSaved')
                )
                this._router.navigate(['/']);
            }, (err) => {
                this._swalService.error(
                    this._translatePipe.transform('Error'),
                    this._translatePipe.transform('DefaultError')
                );
            });
    }

    update(value: any): void {
        this._spinner.show();

        this._expenseService.update(value)
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                this._swalService.success(
                    this._translatePipe.transform('Success'),
                    this._translatePipe.transform('ItemUpdated')
                )

                this._router.navigate(['/']);
            }, (err) => {
                this._swalService.error(
                    this._translatePipe.transform('Error'),
                    this._translatePipe.transform('DefaultError')
                );
            });
    }
}