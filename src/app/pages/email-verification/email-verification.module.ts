import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EmailVerificationComponent } from './email-verification.component';
import { EmailVerificationResolver } from './email-verification.resolver';

export const routes = [
  {
    path: '',
    component: EmailVerificationComponent,
    resolve: {
      emailVerified: EmailVerificationResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [EmailVerificationComponent],
  providers: [EmailVerificationResolver]
})
export class EmailVerificationModule {}
