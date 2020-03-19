import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { SwalService } from 'src/app/shared/swal.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss'],
    providers: [TranslatePipe]
})
export class ExpenseListComponent implements OnInit {
    expenses: Array<Expense> = [];

    constructor(private _expenseService: ExpenseService,
        private _spinner: NgxSpinnerService,
        private translate: TranslateService,
        private _translatePipe: TranslatePipe,
        private _swalService: SwalService) {

    }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this._spinner.show();

        this._expenseService.getAll()
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                this.expenses = res;
            }, (err) => {
                this._swalService.error(
                    this._translatePipe.transform('Error'),
                    this._translatePipe.transform('DefaultError')
                );
            })
    }

    remove(expense: Expense): void {
        Swal.fire({
            title: this._translatePipe.transform('Remove'),
            text: this._translatePipe.transform('AreYouSure'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this._translatePipe.transform('No'),
            confirmButtonText: this._translatePipe.transform('Yes')
        }).then((result) => {
            if (result.value) {
                this.removeExpense(expense);
            }
        })
    }

    removeExpense(expense: Expense): void {
        this._spinner.show();

        this._expenseService.delete(expense.id)
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                this._swalService.success(
                    this._translatePipe.transform('Success'),
                    this._translatePipe.transform('ItemRemoved')
                )
                this.load();
            }, (err) => {
                this._swalService.error(
                    this._translatePipe.transform('Error'),
                    this._translatePipe.transform('DefaultError')
                )
            })
    }
}