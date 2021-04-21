import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';
import { TranslateService } from '@ngx-translate/core';
import ResetPassword from 'src/app/shared/models/ResetPassword';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passedEmail:string;
  passedToken:string;
  isLoading = false;
  resetPassword:ResetPassword;
  resetPasswordFormErrors = {
    Email: '',
    Password:'',
    ConfirmPassword:''
  };
  resetPasswordValidationMessages = {
    Email: {
      required: 'Email field is required',
      invalidEmail: 'Email field must be a valid email'
    },
    Password: {
      required: 'Password field is required',
      minlength: 'Password field can\'t be less than 6 characters',
      maxlength: 'Password field can\'t be longer than 16 characters'
    },
    ConfirmPassword: {
      required: 'Password confirmation field is required',
      minlength: 'Password field can\'t be less than 6 characters',
      maxlength: 'Password field can\'t be longer than 16 characters',
      mismatchedPasswords: 'Password is not matched'
    },
  };
  resetPasswordForm: FormGroup;
  constructor(private route: ActivatedRoute,public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,public authenticationService:AuthenticationService,private translate: TranslateService) { }

  ngOnInit(): void {
    this.passedEmail = this.route.snapshot.queryParamMap.get('email');
    this.passedToken = this.route.snapshot.queryParamMap.get('token');
    this.buildResetPasswordForm();
    }

  buildResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      Email: [this.passedEmail, Validators.compose([Validators.required, emailValidator])],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    }, { validator: matchingPasswords('Password', 'ConfirmPassword') });

      this.resetPasswordForm.valueChanges.subscribe(data => this.validateResetPasswordForm());
    }

    validateResetPasswordForm(isSubmitting = false) {
      for (const field in this.resetPasswordFormErrors) {
        this.resetPasswordFormErrors[field] = '';
  
        const input = this.resetPasswordForm.get(field);
        if (input.invalid && (input.dirty || isSubmitting)) {
          for (const error in input.errors) {
            console.log(error);
            this.resetPasswordFormErrors[field] = this.resetPasswordValidationMessages[field][error];
          }
        }
      }
    }

    public onForgetFormSubmit(values:Object):void {
      this.validateResetPasswordForm(true);
      if (this.resetPasswordForm.valid) {
        this.isLoading = true;
        this.resetPassword = new ResetPassword();
        this.resetPassword.email = this.resetPasswordForm.value.Email;
        this.resetPassword.newPassword = this.resetPasswordForm.value.Password;
        this.resetPassword.token = this.passedToken;
        this.authenticationService.resetPassword(this.resetPassword).subscribe(
          response => {
            var successMessage = "";
            this.translate.get('reset-password-success').subscribe((text:string) => {successMessage = text});
            this.snackBar.open(successMessage, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/user/sign-in']);
          },
          error => {
            Object.keys(error).forEach(key => {
              this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          });
            this.isLoading = false
          },
          () => (this.isLoading = false)
        )
      }
    }
}
