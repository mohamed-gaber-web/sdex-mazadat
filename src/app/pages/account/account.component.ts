import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen: boolean;
  public links = [];
  constructor(
    public router: Router,
    private translate: TranslateService,
    public helpers: HelpersService
  ) {}

  ngOnInit() {
    this.getLinks();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getLinks();
    });
    this.onWindowResize();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
  }

  getLinks() {
    this.links = [
      // {
      //   name: 'accountDashboard',
      //   href: 'dashboard',
      //   icon: 'dashboard',
      // },
      {
        name: 'accountInformation',
        href: 'information',
        icon: 'info',
      },
      {
        name: 'shippingAddress',
        href: 'addresses',
        icon: 'location_on',
      },
      // {
      //   name: 'orderHistory',
      //   href: 'orders',
      //   icon: 'add_shopping_cart',
      // },
      {
        name: 'subscribedBiddings',
        href: 'subscribed-biddings',
        icon: 'history',
      },
      {
        name: 'signOut',
        href: '/sign-in',
        icon: 'power_settings_new',
      },
    ];
  }
}
