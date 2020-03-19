import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateStore } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseServiceMock } from 'src/app/services/mocks/expense.service.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseListComponent } from './expense-list.component';

describe('ExpenseListComponent', () => {
    let comp: ExpenseListComponent;
    let fixture: ComponentFixture<ExpenseListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgxSpinnerModule,
                HttpClientModule,
                SharedModule.forRoot()
            ],
            declarations: [
                ExpenseListComponent
            ],
            providers: [
                { provide: ExpenseService, useClass: ExpenseServiceMock },
                { provide: TranslateStore, useClass: TranslateStore },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ExpenseListComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(ExpenseListComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have one expense', async () => {
        comp.ngOnInit();
        expect(comp.expenses.length).toEqual(1);
    });
});
