import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { NgxSpinnerModule } from 'ngx-spinner'
import { SharedModule, HttpLoaderFactory } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate : false
    }),
    SharedModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID,
      deps: [AuthService],
      useFactory: (authService) => authService.locale
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
