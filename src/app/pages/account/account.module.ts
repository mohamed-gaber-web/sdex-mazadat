import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { DatePipe } from '@angular/common';
import { SubscribedBiddingsComponent } from './subscribed-biddings/subscribed-biddings.component';
import { SubscribedBiddingsResolver } from './subscribed-biddings.resolver';

export const routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'subscribed-biddings', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'information',
        component: InformationComponent,
        data: { breadcrumb: 'Information' },
      },
      {
        path: 'addresses',
        component: AddressesComponent,
        data: { breadcrumb: 'Addresses' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { breadcrumb: 'Orders' },
      },
      {
        path: 'subscribed-biddings',
        component: SubscribedBiddingsComponent,
        data: { breadcrumb: 'Subscribed Biddings' },
        resolve: {
          biddings: SubscribedBiddingsResolver
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    SubscribedBiddingsComponent,
  ],
  providers: [DatePipe, SubscribedBiddingsResolver],
})
export class AccountModule {}
