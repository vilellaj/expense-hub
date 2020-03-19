import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Expense } from 'src/app/models/expense';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import Swal from 'sweetalert2';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { SwalService } from 'src/app/shared/swal.service';

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

    buildForm(expense: Expense = new Expense()) {
        const date = expense.date ?
            new Date(expense.date).toISOString().slice(0, -1) :
            '';

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

        value.date = this.getDate(value.date);

        if (id > 0) {
            value.id = id;
            this.update(value);
        } else {
            this.add(value);
        }
    }

    getDate(date: string): Date {
        if (this._translate.store.currentLang == 'pt') {
            const split = date.split('/');
            date = `${split[1]}/${split[0]}/${split[2]}`
        }

        return new Date(date);
    }

    add(value): void {
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

    update(value): void {
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