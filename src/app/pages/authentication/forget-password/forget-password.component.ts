import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import ForgetPassword from 'src/app/shared/models/ForgetPassword';
import { TranslateService } from '@ngx-translate/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,public authenticationService:AuthenticationService,private translate: TranslateService) { }
  isLoading = false;
  forgetPassword:ForgetPassword;
  forgetFormErrors = {
    Email: '',
  };
  forgetValidationMessages = {
    Email: {
      required: 'Email field is required',
      invalidEmail: 'Email field must be a valid email'
    },
  
  };
  forgetForm: FormGroup;
  ngOnInit(): void {
    this.buildForgetForm();
  }
  buildForgetForm() {
    this.forgetForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, emailValidator])],
    });
      this.forgetForm.valueChanges.subscribe(data => this.validateForgetForm());
    }

    validateForgetForm(isSubmitting = false) {
      for (const field in this.forgetFormErrors) {
        this.forgetFormErrors[field] = '';
  
        const input = this.forgetForm.get(field);
        if (input.invalid && (input.dirty || isSubmitting)) {
          for (const error in input.errors) {
            console.log(error);
            this.forgetFormErrors[field] = this.forgetValidationMessages[field][error];
          }
        }
      }
    }

    public onForgetFormSubmit(values:Object):void {
      this.validateForgetForm(true);
      if (this.forgetForm.valid) {
        this.isLoading = true;
        this.forgetPassword = new ForgetPassword();
        this.forgetPassword.email = this.forgetForm.value.Email;
        this.forgetPassword.callbackurl = location.origin + "/user/reset-password";
        this.authenticationService.forgetPassword(this.forgetPassword).subscribe(
          response => {
            var successMessage = "";
            this.translate.get('forget-password-success').subscribe((text:string) => {successMessage = text});
            this.snackBar.open(successMessage, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/']);
          },
          error => {
            Object.keys(error).forEach(key => {
              this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          });
            
            this.forgetForm.reset();
            this.isLoading = false
          },
          () => (this.isLoading = false)
        )
      }
    }
}
