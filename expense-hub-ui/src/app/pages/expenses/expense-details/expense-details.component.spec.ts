import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateStore } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { of } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseServiceMock } from 'src/app/services/mocks/expense.service.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseDetailsComponent } from './expense-details.component';
import { ActivatedRouteMock } from 'src/app/services/mocks/activated-route.mock';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from 'src/app/services/mocks/auth.service.mock';

describe('ExpenseDetailsComponent', () => {
    let comp: ExpenseDetailsComponent;
    let fixture: ComponentFixture<ExpenseDetailsComponent>;
    let activatedRouteStub: ActivatedRouteMock;

    beforeEach(async(() => {
        activatedRouteStub = new ActivatedRouteMock();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgxSpinnerModule,
                HttpClientModule,
                ReactiveFormsModule,
                SharedModule.forRoot()
            ],
            declarations: [
                ExpenseDetailsComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteStub
                },
                { provide: TranslateStore, useClass: TranslateStore },
                { provide: AuthService, useClass: AuthServiceMock },
                { provide: ExpenseService, useClass: ExpenseServiceMock },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ExpenseDetailsComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(ExpenseDetailsComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have invalid form', () => {
        comp.expenseForm.controls['description'].setValue('');
        comp.expenseForm.controls['value'].setValue('');
        comp.expenseForm.controls['date'].setValue('');
        expect(comp.expenseForm.valid).toEqual(false);
    });

    it('should have valid form', () => {
        comp.expenseForm.controls['description'].setValue('New expense');
        comp.expenseForm.controls['value'].setValue(100);
        comp.expenseForm.controls['date'].setValue(new Date());
        expect(comp.expenseForm.valid).toEqual(true);
    });

    it('should change params', () => {
        expect(comp.id).toBeUndefined();
        activatedRouteStub.testParams = {
            id: '1',
        };
        fixture.detectChanges();
        expect(comp.id).toEqual('1');
    });
});
