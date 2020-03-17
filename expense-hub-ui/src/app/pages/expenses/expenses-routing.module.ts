import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

const routes: Routes = [
    {
        path: '',
        component: ExpenseListComponent,
    },
    {
        path: 'add',
        component: ExpenseDetailsComponent,
    },
    {
        path: 'edit/:id',
        component: ExpenseDetailsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpensesRoutingModule { }