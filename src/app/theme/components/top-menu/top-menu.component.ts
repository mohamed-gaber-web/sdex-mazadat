import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';

import User from 'src/app/shared/models/User';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit {

  
  public currencies = ['USD', 'EUR'];
  public currency: any;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg', code: 'en-US' },
    { name: 'العربية', image: 'assets/images/flags/ar.svg', code: 'ar-EG' },
  ];
  public flag: any;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public appService: AppService,
    public loginService: AuthenticationService,
    public storageService: StorageService,
    public snackBar: MatSnackBar,
    public router: Router,
    private translate: TranslateService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {




    this.currency = this.currencies[0];
    this.flag = this.flags.find(
      (c) => c.name == this.storageService.getLanguage().name
    );
  }

  public changeCurrency(currency) {
    this.currency = currency;
  }

  public changeLang(flag) {
    this.flag = flag;
    this.translate.use(flag.code);
    this.storageService.setLanguage(flag);
    if (flag.name === 'العربية') {
      this.settings.rtl = true;
    } else {
      this.settings.rtl = false;
    }
  }

  public signOut() {
    this.storageService.clear();
    this.snackBar.open('You signed out successfully!', '×', {
      panelClass: 'success',
      verticalPosition: 'top',
      duration: 3000,
    });
    this.router.navigate(['/']);
  }
}
