import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    exports: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class SharedModule { }