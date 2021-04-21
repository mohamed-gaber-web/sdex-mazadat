import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import Shipping from 'src/app/shared/models/Shipping';
import { AccountService } from '../account.service';
import { TranslateService } from '@ngx-translate/core';
import User from 'src/app/shared/models/User';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  /**
   * Determine if in loading state or not.
   */
  isLoading = false;
  user:User;
  shipping : Shipping;
  shippingFormErrors = {
    firstName: '',
    lastName: '',
    city: '',
    area: '',
    street: '',
    buildingNumber: '',
    floorNumber: '',
    appartmentNumber: '',
    landmark: '',
    locationType: '',
    mobile: '',
    landLine: '',
    note: '',
    countryId: '',

  };
  shippingValidationMessages = {

    firstName: {
      required: 'First Name field is required',
      minlength: 'First Name is not long enough, minimum of 3 characters',
      maxlength: 'First Name excceded max length, max of 16 characters',
      pattern: 'Special Characters are not allowed'

    },
    lastName: {
      required: 'Last Name field is required',
      minlength: 'Last Name is not long enough, minimum of 3 characters',
      maxlength: 'Last Name excceded max length, max of 16 characters',
      pattern: 'Special Characters are not allowed'
    },
    city: {
      required: 'City field is required',
    },
    area: {
      required: 'Area field is required',
      minlength: 'Last Name is not long enough, minimum of 3 characters',

    },
    street: {
      required: 'Street field is required',
      maxlength: 'Street field excceded max length, max of 16 characters'

    },
    buildingNumber: {
      maxlength: 'Building Number excceded max length, max of 16 characters'
    },
    floorNumber: {
      maxlength: 'Floor Number excceded max length, max of 16 characters'
    },
    appartmentNumber: {
      maxlength: 'Building Number excceded max length, max of 16 characters'
    },
    landmark: {
      maxlength: 'Landmark excceded max length, max of 255 characters'

    },
    locationType: {
      maxlength: 'Location type excceded max length, max of 16 characters'
    },
    mobile: {
      minlength: 'Mobile Number is not long enough length, minimum of 11 characters',
      maxlength: 'Mobile Number excceded max length, max of 16 characters',
      pattern: 'Only numbers and + ( ) are allowed'
    },
    landLine: {
      minlength: 'LandLine Number is not long enough length, minimum of 8 characters',
      maxlength: 'LandLine Number excceded max length, max of 11 characters',
      pattern: 'Only numbers and + ( ) are allowed'
    },
    note: {
      maxlength: 'LandLine Number excceded max length, max of 255 characters',
    },
    countryId: {
      required: 'Country field is required',
    }

  };
  shippingForm: FormGroup;
  countries = [];
  constructor(private accountService: AccountService, private translate:TranslateService,public formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.shipping = new Shipping();
    this.accountService.getAccount().subscribe(
      (response : any) => {
        var shippingData = new Shipping();
          delete response.shipping.country;
          shippingData = response.shipping;
          delete shippingData.id;
          this.shippingForm.setValue(shippingData);
      },
      error => {
        Object.keys(error).forEach(key => {
          this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });        
      },
    )
    this.buildShippingForm();

  }

  public onShippingFormSubmit(values: Object): void {
    this.validateShippingForm(true);
    if (this.shippingForm.valid) {
      this.isLoading = true;
      this.shipping = new Shipping();
      Object.assign(this.shipping, this.shippingForm.value);
      this.accountService.updateShipping(this.shipping).subscribe(
        response => {
          var successMessage = "";
          this.translate.get('update-shipping-success').subscribe((text:string) => {successMessage = text});
          this.snackBar.open(successMessage, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

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
  buildShippingForm() {
    this.shippingForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[a-zA-Z0-9]+$")])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16),Validators.pattern("^[a-zA-Z0-9]+$")])],
      city: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      street: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])],
      buildingNumber: ['', Validators.compose([Validators.maxLength(16)])],
      floorNumber: ['', Validators.compose([Validators.maxLength(16)])],
      appartmentNumber: ['', Validators.compose([Validators.maxLength(16)])],
      landmark: ['', Validators.compose([Validators.maxLength(16)])],
      locationType: ['', Validators.compose([Validators.maxLength(16)])],
      mobile: ['', Validators.compose([Validators.required,Validators.maxLength(16),Validators.minLength(11),Validators.pattern("^[0-9()+]+$")])],
      landLine: ['', Validators.compose([Validators.maxLength(16),Validators.minLength(8),Validators.pattern("^[0-9()+]+$")])],
      note: ['', Validators.compose([Validators.maxLength(255)])],
      countryId: ['', Validators.compose([Validators.required])],
    });
    this.shippingForm.valueChanges.subscribe(data => this.validateShippingForm());
  }
  validateShippingForm(isSubmitting = false) {
    for (const field in this.shippingFormErrors) {
      this.shippingFormErrors[field] = '';

      const input = this.shippingForm.get(field);
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error in input.errors) {
          this.shippingFormErrors[field] = this.shippingValidationMessages[field][error];
        }
      }
    }
  }
}
