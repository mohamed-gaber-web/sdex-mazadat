import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import UpdatePassword from 'src/app/shared/models/UpdatePassword';
import { AccountService } from '../account.service';
import User from 'src/app/shared/models/User';
import { DatePipe } from '@angular/common';
import UpdateBasicUserInfo from 'src/app/shared/models/UpdateUserBasicInfo';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  isLoading = false;
  //Change Password Form
  passwordFormErrors = {
    OldPassword: '',
    NewPassword: '',
    ConfirmNewPassword:''
  };
  passwordValidationMessages = {
    OldPassword: {
      required: 'Password field is required',
    },
    NewPassword: {
      required: 'Password field is required',
      minlength: 'Password field can\'t be less than 6 characters',
    },
    ConfirmNewPassword: {
      required: 'Password confirmation field is required',
      mismatchedPasswords: 'Password is not matched'
    },
  };
  //Update User Form
  userFormErrors = {
    firstName: '',
    lastName: '',
    email:'',
    phoneNumber:'',
    birthdate:'',
    gender:''
  };
  userValidationMessages = {
    phoneNumber: {
      required: 'Phonenumber is required'
    },
    birthdate:{
      required: 'Birthdate is required'
    },
    gender:{
      required: 'Gender is required'
    }
  };
  updatePassword : UpdatePassword;
  user  : UpdateBasicUserInfo;
  userForm: FormGroup;
  passwordForm: FormGroup;
  constructor(private datePipe: DatePipe,public formBuilder: FormBuilder, public snackBar: MatSnackBar,private accountService:AccountService) { }

  ngOnInit() {
   this.buildPasswordForm();
    this.accountService.getAccount().subscribe(
      (response : any) => {
       this.userForm.controls['firstName'].setValue(response.firstName);
       this.userForm.controls['lastName'].setValue(response.lastName);
       this.userForm.controls['email'].setValue(response.email);
       this.userForm.controls['phoneNumber'].setValue(response.phoneNumber);
       this.userForm.controls['birthdate'].setValue(this.datePipe.transform(response.birthdate,"yyyy-MM-dd"));
       this.userForm.controls['gender'].setValue(response.gender);

      },
      error => {
        Object.keys(error).forEach(key => {
          this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });        
      },
    )
    this.buildUserForm();
  }

  //Password Form
  buildPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      OldPassword: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      NewPassword: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      ConfirmNewPassword: ['', Validators.required]
    },{validator: matchingPasswords('NewPassword', 'ConfirmNewPassword')});
    this.passwordForm.valueChanges.subscribe(data => this.validatePasswordForm());

  }

  validatePasswordForm(isSubmitting = false) {
    for (const field in this.passwordFormErrors) {
      this.passwordForm[field] = '';
      const input = this.passwordForm.get(field);
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error in input.errors) {
          this.passwordForm[field] = this.passwordValidationMessages[field][error];
        }
      }
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    this.validatePasswordForm(true);
    if (this.passwordForm.valid) {
      this.updatePassword = new UpdatePassword();
      this.isLoading = true;
      Object.assign(this.updatePassword, this.passwordForm.value);
      this.accountService.updatePassword(this.updatePassword).subscribe(
        response => {

          this.snackBar.open('Your password updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.passwordForm.reset();
        },
        error => {
          Object.keys(error).forEach(key => {
            this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
          
          this.passwordForm.reset();
          this.isLoading = false
        },
        () => (this.isLoading = false)
      )
    }
  }

  //User Form
  buildUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: [{value: '', disabled: true}, Validators.compose([Validators.required,Validators.minLength(6)])],
      lastName: [{value: '', disabled: true}, Validators.compose([Validators.required,Validators.minLength(6)])],
      email: [{value: '', disabled: true}, Validators.compose([Validators.required])],
      phoneNumber:['', Validators.compose([Validators.required,Validators.maxLength(16),Validators.minLength(11),Validators.pattern("^[0-9()+]+$")])],
      gender:['', Validators.compose([Validators.required])],
      birthdate:['', Validators.compose([Validators.required])],

    });
    this.userForm.valueChanges.subscribe(data => this.validateUserForm());

  }

  validateUserForm(isSubmitting = false) {
    for (const field in this.userFormErrors) {
      this.userForm[field] = '';
      const input = this.userForm.get(field);
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error in input.errors) {
          this.userForm[field] = this.userValidationMessages[field][error];
        }
      }
    }
  }

  public onUserFormSubmit(values:Object):void {
    this.validateUserForm(true);
    if (this.userForm.valid) {
      this.user = new UpdateBasicUserInfo();
      this.user.phoneNumber = this.userForm.controls['phoneNumber'].value;
      this.user.gender = this.userForm.controls['gender'].value;
      this.user.birthdate = this.userForm.controls['birthdate'].value;
      this.isLoading = true;
      this.accountService.updateUserBasicInfo(this.user).subscribe(
        response => {

          this.snackBar.open('Your Profile updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.passwordForm.reset();
        },
        error => {
          Object.keys(error).forEach(key => {
            this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
          
          this.userForm.reset();
          this.isLoading = false
        },
        () => (this.isLoading = false)
      )
    }
  }
}
