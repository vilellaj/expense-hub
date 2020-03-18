import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Expense } from 'src/app/models/expense';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-expense-details',
    templateUrl: './expense-details.component.html',
    styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {
    private id: string;
    private expense: Expense;
    public expenseForm: FormGroup;
    public action: string = 'Save';

    constructor(private _spinner: NgxSpinnerService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _expenseService: ExpenseService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService) {
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
            date: [date, Validators.required],
            userId: [this._authService.user.id]
        })
    }

    ngOnInit(): void {
        if (this._route.snapshot.params['id']) {
            this.action = 'Update';
            this.id = this._route.snapshot.params['id']
            this.load();
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!'
                });
            })
    }

    addOrUpdate(): void {
        if (parseInt(this.id) > 0) {
            this.update();
        } else {
            this.add();
        }
    }

    add(): void {
        this._spinner.show();
        this._expenseService.add(this.expenseForm.value)
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message
                });
                this._router.navigate(['/']);
            }, (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!'
                });
            });
    }

    update(): void {
        this._spinner.show();

        const value = this.expenseForm.value;
        value.id = parseInt(this.id);

        this._expenseService.update(value)
            .pipe(finalize(() => this._spinner.hide()))
            .subscribe((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message
                });
                this._router.navigate(['/']);
            }, (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!'
                });
            });
    }
}