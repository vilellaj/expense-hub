import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateStore } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseServiceMock } from 'src/app/services/mocks/expense.service.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgxSpinnerModule,
                HttpClientModule,
                ReactiveFormsModule,
                SharedModule.forRoot()
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                { provide: TranslateStore, useClass: TranslateStore }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoginComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should have invalid form', () => {
        comp.loginForm.controls['username'].setValue('');
        comp.loginForm.controls['password'].setValue('');
        expect(comp.loginForm.valid).toEqual(false);
    });

    it('should have valid form', () => {
        comp.loginForm.controls['username'].setValue('test');
        comp.loginForm.controls['password'].setValue('123');
        expect(comp.loginForm.valid).toEqual(true);
    });
});
