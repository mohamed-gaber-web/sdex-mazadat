import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TermsConditionsComponent } from './terms-conditions.component';
import { TermsConditionsResolver } from './terms-conditions.resolver';

export const routes = [
  {
    path: '',
    component: TermsConditionsComponent,
    resolve: {
      termsInfo: TermsConditionsResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [TermsConditionsComponent],
  providers: [TermsConditionsResolver],
})
export class TermsConditionsModule {}
