import { Component, OnInit, Input } from '@angular/core';
import { SidenavMenuService } from './sidenav-menu.service';

import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [SidenavMenuService],
})
export class SidenavMenuComponent implements OnInit {
  @Input() menuItems;
  @Input() menuParentId;
  parentMenu: Array<any>;

  constructor(
    private sidenavMenuService: SidenavMenuService,
    public loginService: AuthenticationService
  ) {}

  ngOnInit() {
    this.parentMenu = this.menuItems.filter(
      (item) => item.parentId == this.menuParentId
    );
  }

  onClick(menuId) {
    this.sidenavMenuService.toggleMenuItem(menuId);
    this.sidenavMenuService.closeOtherSubMenus(this.menuItems, menuId);
  }
}
