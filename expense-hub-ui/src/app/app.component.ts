import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _translate: TranslateService) {
    const lang = localStorage.getItem(environment.storageKeys.lang);

    if (lang) {
      _translate.use(lang);
    } else {
      _translate.use('en');
    }
  }
}
