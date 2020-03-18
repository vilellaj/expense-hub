import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ExpenseListComponent,
        ExpenseDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        ExpensesRoutingModule,
        SharedModule.forRoot()
    ],
    providers: [ExpenseService]
})
export class ExpensesModule { }