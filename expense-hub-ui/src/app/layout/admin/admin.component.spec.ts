import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateStore } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
    let comp: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgxSpinnerModule,
                HttpClientModule,
                SharedModule.forRoot()
            ],
            declarations: [
                AdminComponent
            ],
            providers: [
                { provide: TranslateStore, useClass: TranslateStore },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AdminComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(AdminComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

});
