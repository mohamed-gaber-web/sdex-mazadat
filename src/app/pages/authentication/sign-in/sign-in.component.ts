import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import LoginCredentials from 'src/app/shared/models/LoginCredentials';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResendConfirmationLinkModalComponent } from './resend-confirmation-link-modal/resend-confirmation-link-modal.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  isLoading = false;
  hide = true;
  returnUrl: string;

  loginFormErrors = {
    Email: '',
    Password: '',
  };
  loginValidationMessages = {
    Email: {
      required: 'Email field is required',
      invalidEmail: 'Email field must be a valid email',
    },
    Password: {
      required: 'Password field is required',
    },
  };
  loginForm: FormGroup;
  loginCredentials: LoginCredentials;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private dialog: MatDialog,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public signInService: AuthenticationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.loginCredentials = new LoginCredentials();
    this.buildLoginForm();
  }
  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, emailValidator])],
      Password: ['', Validators.required],
    });
    this.loginForm.valueChanges.subscribe((data) => this.validateLoginForm());
  }

  validateLoginForm(isSubmitting = false) {
    for (const field of Object.keys(this.loginFormErrors)) {
      this.loginForm[field] = '';

      const input = this.loginForm.get(field) as FormControl;
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error of Object.keys(input.errors)) {
          console.log(error);
          this.loginForm[field] = this.loginValidationMessages[field][error];
        }
      }
    }
  }

  public onLoginFormSubmit(values): void {
    this.validateLoginForm(true);
    if (this.loginForm.valid) {
      this.isLoading = true;
      Object.assign(this.loginCredentials, this.loginForm.value);
      this.signInService.signIn(this.loginCredentials).subscribe(
        (response) => {
          this.storageService.setAccessToken(response);
          this.storageService.setExpiresIn(
            new Date(response['.expires']).getTime() / 1000
          );
          // this.signInService.IsLoggedIn();
          this.snackBar.open('You signed in successfully!', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          if (error.error[0] === 'Your email not confirmed') {
            this.resendConfirmationLink();
          }
          Object.keys(error).forEach((key) => {
            this.snackBar.open(error[key][0], '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000,
            });
          });

          this.loginForm.reset();
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
    }
  }

  resendConfirmationLink() {
    this.dialog.open(ResendConfirmationLinkModalComponent, {
      panelClass: 'small-modal',
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
