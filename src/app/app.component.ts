import { Component, Inject, PLATFORM_ID, AfterViewInit, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,AfterViewInit {
  loading: boolean;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private translate: TranslateService,
    private storageService: StorageService
  ) {
    this.settings = this.appSettings.settings;
    translate.setDefaultLang('ar-EG');
    translate.use(this.storageService.getLanguage().code);
  }

  ngOnInit() {
    // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
