import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpensesRoutingModule } from './expenses-routing.module';

@NgModule({
    declarations: [
        ExpenseListComponent,
        ExpenseDetailsComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule
    ]
})
export class ExpensesModule { }