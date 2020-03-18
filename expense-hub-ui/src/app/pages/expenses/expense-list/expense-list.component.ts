import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';
import { Expense } from 'src/app/models/expense';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
    expenses: Array<Expense> = [];

    constructor(private _expenseService: ExpenseService,
        private _spinner: NgxSpinnerService) {

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!'
                });
            })
    }
}