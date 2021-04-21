import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthenticationService } from '../authentication.service';
import { FileValidator } from 'ngx-material-file-input';
import FileUpload from 'src/app/shared/models/FileUpload';
import RegisterVendor from 'src/app/shared/models/RegisterVendor';
@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.scss']
})
export class VendorSignupComponent implements OnInit {

  /**
   * Determine if in loading state or not.
   */
  isLoading = false;
  vendorFormErrors = {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    BirthDate: '',
    Gender:'',
    NationalID: '',
    CompanyRegistration: '',
    Passport: '',
    Tax: '',
  };
  vendorValidationMessages = {
    FirstName: {
      required: 'First Name field is required',
      minlength: 'Full Name is not long enough, minimum of 3 characters'
    },
    LastName: {
      required: 'Last Name field is required',
      minlength: 'Last Name is not long enough, minimum of 3 characters'
    },
    Email: {
      required: 'Email field is required',
      invalidEmail: 'Email field must be a valid email'
    },
    PhoneNumber: {
      minlength: 'Phone Number is not long enough, minimum of 8 characters',
      required: 'Phone Number field is required'
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
    BirthDate: {
      required: 'Birth Date is Required',
    },
    Gender: {
      required: 'Gender is Required',
    },
    NationalID: {
      required: 'National ID copy is required',
      maxContentSize: 'Max size is 5mb'
    },
    CompanyRegistration: {
      required: 'National ID copy is required',
      maxContentSize: 'Max size is 5mb'
    },
    Passport: {
      maxContentSize: 'Max size is 5mb'
    },
    Tax: {
      required: 'National ID copy is required',
      maxContentSize: 'Max size is 5mb'
    },

  };
  fileUpload: FileUpload;
  uploadedFiles : FileUpload[];
  registerVendor: RegisterVendor;
  nationalFile:FileUpload;
  companyFile:FileUpload;
  taxFile:FileUpload;
  passportFile:FileUpload;

  vendorForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public router: Router, public snackBar: MatSnackBar, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.buildVendorForm();
  }

  public onVendorFormSubmit(values: Object): void {
    this.validateRegisterForm(true);
    if (this.vendorForm.valid) {
      this.isLoading = true;
      this.registerVendor = new RegisterVendor();
      this.registerVendor.firstName = this.vendorForm.value.FirstName;
      this.registerVendor.lastName = this.vendorForm.value.LastName;
      this.registerVendor.email = this.vendorForm.value.Email;
      this.registerVendor.phoneNumber = this.vendorForm.value.PhoneNumber;
      this.registerVendor.birthDate = this.vendorForm.value.BirthDate;
      this.registerVendor.gender = this.vendorForm.value.Gender;
      this.registerVendor.password = this.vendorForm.value.Password;
      this.registerVendor.files = [this.nationalFile,this.companyFile,this.taxFile];
      if(this.passportFile != null){this,this.registerVendor.files.push(this.passportFile)}
      this.authenticationService.registerVendor(this.registerVendor).subscribe(
        response => {
          this.snackBar.open('You applied successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/']);
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
  buildVendorForm() {
    this.vendorForm = this.formBuilder.group({
      FirstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      LastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      Email: ['', Validators.compose([Validators.required, emailValidator])],
      PhoneNumber: ['', Validators.compose([Validators.required,Validators.minLength(8)])],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      BirthDate: ['', Validators.required],
      Gender: ['', Validators.required],
      NationalID: ['', Validators.compose([Validators.required, FileValidator.maxContentSize(5242880)])],
      CompanyRegistration: ['', Validators.compose([Validators.required, FileValidator.maxContentSize(5242880)])],
      Passport: ['', Validators.compose([FileValidator.maxContentSize(5242880)])],
      Tax: ['', Validators.compose([Validators.required, FileValidator.maxContentSize(5242880)])],
    }, { validator: matchingPasswords('Password', 'ConfirmPassword') });
    this.vendorForm.valueChanges.subscribe(data => this.validateRegisterForm());
  }
  validateRegisterForm(isSubmitting = false) {
    for (const field in this.vendorFormErrors) {
      this.vendorFormErrors[field] = '';

      const input = this.vendorForm.get(field);
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error in input.errors) {
          this.vendorFormErrors[field] = this.vendorValidationMessages[field][error];
        }
      }
    }
  }

  onNationalChange(){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.vendorForm.value.NationalID.files[0]);
    this.nationalFile = new FileUpload();
    //NationalID
    fileReader.onload = () => {
      this.nationalFile.fileName = this.vendorForm.value.NationalID.files[0].name;
      this.nationalFile.fieldName = "NationalId";
      this.nationalFile.fileData = this.nationalFile.validBase64(fileReader.result.toString());
      this.nationalFile.fileExtension = this.nationalFile.getExtension(this.nationalFile.fileName);
    };
    console.log(this.nationalFile)
  }
  onCompanyChange(){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.vendorForm.value.CompanyRegistration.files[0]);
    this.companyFile = new FileUpload();
    //NationalID
    fileReader.onload = () => {
      this.companyFile.fileName = this.vendorForm.value.CompanyRegistration.files[0].name;
      this.companyFile.fieldName = "CompanyRegistration";
      this.companyFile.fileData = this.companyFile.validBase64(fileReader.result.toString());
      this.companyFile.fileExtension = this.companyFile.getExtension(this.companyFile.fileName);
    };
    console.log(this.companyFile)
  }
  onTaxChange(){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.vendorForm.value.Tax.files[0]);
    this.taxFile = new FileUpload();
    //NationalID
    fileReader.onload = () => {
      this.taxFile.fileName = this.vendorForm.value.CompanyRegistration.files[0].name;
      this.taxFile.fieldName = "Tax";
      this.taxFile.fileData = this.taxFile.validBase64(fileReader.result.toString());
      this.taxFile.fileExtension = this.taxFile.getExtension(this.taxFile.fileName);
    };
    console.log(this.taxFile)
  }
  onPassportChange(){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.vendorForm.value.Passport.files[0]);
    this.passportFile = new FileUpload();
    //NationalID
    fileReader.onload = () => {
      this.passportFile.fileName = this.vendorForm.value.Passport.files[0].name;
      this.passportFile.fieldName = "Passport";
      this.passportFile.fileData = this.passportFile.validBase64(fileReader.result.toString());
      this.passportFile.fileExtension = this.passportFile.getExtension(this.passportFile.fileName);
    };
    console.log(this.passportFile)
  }
}
