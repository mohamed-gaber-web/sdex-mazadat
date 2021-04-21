import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  emailValidator,
  matchingPasswords,
} from '../../../theme/utils/app-validators';
import RegisterUser from 'src/app/shared/models/RegisterCustomer';
import Role from 'src/app/shared/models/Role';
import { AuthenticationService } from '../authentication.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponent } from 'src/app/shared/modals/terms-modal/terms-modal.component';
import { Subscription } from 'rxjs';
import { callbackUrl } from 'src/app/shared/constants/general.constants';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss'],
})
export class CustomerSignupComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  /**
   * Determine if in loading state or not.
   */
  isLoading = false;
  registerFormErrors = {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Gender: '',
    BirthDate: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    nationalIdNumber: '',
    acceptTerms: null,
  };
  registerValidationMessages = {
    FirstName: {
      required: 'First Name field is required',
      minlength: 'Full Name is not long enough, minimum of 3 characters',
    },
    LastName: {
      required: 'Last Name field is required',
      minlength: 'Last Name is not long enough, minimum of 3 characters',
    },
    nationalIdNumber: {
      required: 'National Id Number field is required',
      minlength:
        'national Id Number is not long enough, minimum of 14 characters',
    },
    Email: {
      required: 'Email field is required',
      invalidEmail: 'Email field must be a valid email',
    },
    PhoneNumber: {
      minlength: 'Phone Number is not long enough, minimum of 8 characters',
      required: 'Phone Number field is required',
    },
    BirthDate: {
      required: 'Birth Date is Required',
    },
    Gender: {
      required: 'Gender is Required',
    },
    acceptTerms: {
      required: 'You must agree to the terms & conditions to complete signup',
    },
    Password: {
      required: 'Password field is required',
      minlength: "Password field can't be less than 6 characters",
      maxlength: "Password field can't be longer than 16 characters",
    },
    ConfirmPassword: {
      required: 'Password confirmation field is required',
      minlength: "Password field can't be less than 6 characters",
      maxlength: "Password field can't be longer than 16 characters",
      mismatchedPasswords: 'Password is not matched',
    },
  };
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerUser: RegisterUser;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    private customerSignupService: AuthenticationService,
    private uiService: UiService,
    public dialog: MatDialog,
    private helpers: HelpersService
  ) {}

  ngOnInit() {
    this.registerUser = new RegisterUser();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
    this.buildRegisterForm();
  }

  async uploadImg(files: File[]) {
    const imgString: any = await this.helpers.toBase64(files[0]);
    (this.registerForm.get('nationalID') as FormGroup).patchValue({
      fieldName: 'nationalIDImage',
      filename: files[0].name,
      fileExtension: this.helpers.getExtension(files[0].name),
      fileData: this.helpers.validBase64(imgString),
    });
  }

  openTerms() {
    this.dialog.open(TermsModalComponent, {
      panelClass: 'large-modal',
    });
  }

  public onRegisterFormSubmit(values: object): void {
    this.validateRegisterForm(true);
    if (this.registerForm.valid) {
      this.isLoading = true;
      delete this.registerForm.value.acceptTerms;
      Object.assign(this.registerUser, this.registerForm.value);
      this.subs.push(
        this.customerSignupService
          .registerCustomer(this.registerUser)
          .subscribe(
            (response) => {
              this.snackBar.open('You registered successfully!', '×', {
                panelClass: 'success',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.router.navigate(['/']);
            },
            (error) => {
              Object.keys(error).forEach((key) => {
                this.snackBar.open(error[key][0], '×', {
                  panelClass: 'error',
                  verticalPosition: 'top',
                  duration: 3000,
                });
              });
              this.isLoading = false;
            },
            () => (this.isLoading = false)
          )
      );
    }
  }
  buildRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        FirstName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        LastName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        nationalIdNumber: [
          '',
          Validators.compose([Validators.required, Validators.minLength(14)]),
        ],
        Email: ['', Validators.compose([Validators.required, emailValidator])],
        PhoneNumber: [
          '',
          Validators.compose([Validators.minLength(8), Validators.required]),
        ],
        BirthDate: ['', Validators.required],
        Gender: ['', Validators.required],
        Password: ['', Validators.required],
        nationalID: this.formBuilder.group({
          fieldName: ['', !Validators.required],
          filename: ['', !Validators.required],
          fileExtension: ['', !Validators.required],
          fileData: ['', !Validators.required],
        }),
        ConfirmPassword: ['', Validators.required],
        acceptTerms: [null, Validators.required],
        callbackUrl: [callbackUrl],
      },
      { validator: matchingPasswords('Password', 'ConfirmPassword') }
    );
    this.registerForm.valueChanges.subscribe((data) =>
      this.validateRegisterForm()
    );
  }
  validateRegisterForm(isSubmitting = false) {
    for (const field of Object.keys(this.registerFormErrors)) {
      this.registerFormErrors[field] = '';
      const input = this.registerForm.get(field) as FormControl;
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error of Object.keys(input.errors)) {
          console.log(error);
          this.registerFormErrors[field] = this.registerValidationMessages[
            field
          ][error];
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
