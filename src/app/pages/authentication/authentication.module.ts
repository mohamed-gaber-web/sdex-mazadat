import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { AuthenticationService } from './authentication.service';
import { VendorSignupComponent } from './vendor-signup/vendor-signup.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResendConfirmationLinkModalComponent } from './sign-in/resend-confirmation-link-modal/resend-confirmation-link-modal.component';

export const routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {
        path: 'sign-in',
        component: SignInComponent,
        data: { breadcrumb: 'Sign In' },
      },
      {
        path: 'sign-up',
        component: CustomerSignupComponent,
        data: { breadcrumb: 'Sign Up' },
      },
      {
        path: 'apply-as-vendor',
        component: VendorSignupComponent,
        data: { breadcrumb: 'Vendor Application' },
      },
      {
        path: 'email-confirmation',
        component: EmailConfirmationComponent,
        data: { breadcrumb: 'Email Confirmation' },
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        data: { breadcrumb: 'Forget Password' },
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: { breadcrumb: 'Password Reset' },
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MaterialFileInputModule,
    MatRadioModule,
    TranslateModule,
  ],
  declarations: [
    SignInComponent,
    CustomerSignupComponent,
    VendorSignupComponent,
    EmailConfirmationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ResendConfirmationLinkModalComponent,
  ],
  providers: [AuthenticationService],
  entryComponents: [ResendConfirmationLinkModalComponent]
})
export class AuthenticationModule {}
