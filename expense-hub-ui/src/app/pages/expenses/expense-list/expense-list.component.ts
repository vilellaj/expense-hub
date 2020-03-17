import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
    expenses: Array<any> = [];

    ngOnInit(): void {

        this.expenses.push({
            id: 1,
            date: Date.now(),
            description: 'Teste',
            value: 100
        });
        this.expenses.push({
            id: 1,
            date: Date.now(),
            description: 'Teste',
            value: 100
        });
        this.expenses.push({
            id: 1,
            date: Date.now(),
            description: 'Teste',
            value: 100
        }); this.expenses.push({
            id: 1,
            date: Date.now(),
            description: 'Teste',
            value: 100
        }); this.expenses.push({
            id: 1,
            date: Date.now(),
            description: 'Teste',
            value: 100
        })
    }
}