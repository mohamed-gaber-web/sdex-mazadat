import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import LoginCredentials from 'src/app/shared/models/LoginCredentials';
import { Observable } from 'rxjs';
import User from 'src/app/shared/models/User';
import RegisterCustomer from '../../shared/models/RegisterCustomer';
import RegisterVendor from 'src/app/shared/models/RegisterVendor';
import EmailConfirmation from 'src/app/shared/models/EmailConfirmation';
import ForgetPassword from 'src/app/shared/models/ForgetPassword';
import ResetPassword from 'src/app/shared/models/ResetPassword';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    public storageService: StorageService
  ) {}
  /**
   * Check if user logged in or not.
   */
  get IsLoggedIn() {
    return this.storageService.exists('user');
  }
  /**
   * Login API.
   */
  signIn(credentials: LoginCredentials) {
    return this.http.post(`api/users/login`, credentials);
  }

  getUser() {
    if (this.storageService.exists('user')) {
      return this.storageService.getUser();
    }
  }

  registerCustomer(user: RegisterCustomer) {
    return this.http.post(`api/users/register`, user);
  }

  registerVendor(vendor: RegisterVendor) {
    console.log(JSON.stringify(vendor));
    return this.http.post(`api/users/vendor/register`, vendor);
  }

  confirmEmail(emailConfirmation: EmailConfirmation) {
    return this.http.post(`api/users/confirm/`, emailConfirmation);
  }

  forgetPassword(forgetPassword: ForgetPassword) {
    return this.http.post(`api/users/passwordreset`, forgetPassword);
  }
  resetPassword(resetPassword: ResetPassword) {
    return this.http.put(`api/users/passwordreset`, resetPassword);
  }
}
