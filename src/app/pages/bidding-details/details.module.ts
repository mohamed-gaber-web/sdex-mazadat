import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { DetailsMazadComponent } from './details.component';
import { BiddingDetailsResolver } from './bidding-details.resolver';
import { ViewFileModalComponent } from './view-file-modal/view-file-modal.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { InnerBiddingItemComponent } from './inner-bidding-item/inner-bidding-item.component';
import { PaymentIframeModalComponent } from './payment-iframe-modal/payment-iframe-modal.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

export const routes = [
  {
    path: 'details/:id',
    component: DetailsMazadComponent,
    resolve: {
      bidding: BiddingDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, NgxExtendedPdfViewerModule],
  declarations: [
    DetailsMazadComponent,
    ViewFileModalComponent,
    PaymentMethodsComponent,
    InnerBiddingItemComponent,
    PaymentIframeModalComponent,
    MapModalComponent
  ],
  providers: [BiddingDetailsResolver],
  entryComponents: [ViewFileModalComponent, PaymentIframeModalComponent, MapModalComponent],
})
export class DetailsModule {}
