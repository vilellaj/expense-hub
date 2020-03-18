import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SwalService } from './swal.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    exports: [
        SpinnerComponent,
        TranslateModule

    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [SwalService]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}