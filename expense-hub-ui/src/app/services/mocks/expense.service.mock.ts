import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from 'src/app/models/expense';

@Injectable()
export class ExpenseServiceMock {
    expenses = new Array<Expense>();

    constructor() {
        const expense = new Expense();
        expense.id = 1;
        expense.date = new Date();
        expense.description = 'New Expense';
        expense.value = 100;
        this.expenses.push(expense);
    }

    getAll(): Observable<Array<Expense>> {
        return of(this.expenses);
    }

    getById(id: number): Observable<Expense> {
        return of(this.expenses[0]);
    }
}
