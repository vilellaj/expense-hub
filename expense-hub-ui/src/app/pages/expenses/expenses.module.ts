import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxMaskModule } from 'ngx-mask';
import { ExpenseService } from 'src/app/services/expense.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { TranslatePipe } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ExpenseListComponent,
        ExpenseDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        NgxMaskModule.forRoot(),
        ExpensesRoutingModule,
        SharedModule.forRoot()
    ],
    providers: [ExpenseService]
})
export class ExpensesModule { }