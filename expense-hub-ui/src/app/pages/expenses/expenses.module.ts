import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
    declarations: [
        ExpenseListComponent,
        ExpenseDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        ExpensesRoutingModule
    ],
    providers: [ExpenseService]
})
export class ExpensesModule { }