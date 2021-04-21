import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import User from '../models/User';

// import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  arabicFlag = {
    code: 'ar-EG',
    image: 'assets/images/flags/ar.svg',
    name: 'العربية',
  };
  englishFlag = {
    code: 'en-US',
    image: 'assets/images/flags/gb.svg',
    name: 'English',
  };
  getLanguageDirection(): boolean {
    if (this.exists('language')) {
      if (JSON.parse(this.get('language')).name == 'العربية') return true;
    }
    this.setLanguage({
      name: 'English',
      image: 'assets/images/flags/gb.svg',
      code: 'en-US',
    });
    return false;
  }
  public user: User;
  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key, value) {
    return localStorage.setItem(key, value);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }

  removeKeys(keys: string[]) {
    keys.forEach((key) => this.remove(key));
  }

  exists(key) {
    return !!localStorage.getItem(key);
  }

  clear() {
    return localStorage.clear();
  }

  setAccessToken(value) {
    var tokenInfo = this.getDecodedAccessToken(value); // decode token
    this.setUser(tokenInfo);
    return this.set('access_token', value);
  }
  setUser(value) {
    return this.set('user', JSON.stringify(value));
  }
  setLanguage(value) {
    return this.set('language', JSON.stringify(value));
  }
  getLanguage() {
    const langFound = this.exists('language');
    if (langFound == true) {
      return JSON.parse(this.get('language'));
    } else {
      this.setLanguage({
        name: 'English',
        image: 'assets/images/flags/gb.svg',
        code: 'en-US',
      });
      return JSON.parse(this.get('language'));
    }
  }
  setExpiresIn(value) {
    return this.set('expires_in', value);
  }

  getAccessToken() {
    return this.get('access_token');
  }

  getExpiresIn() {
    return this.get('expires_in');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  getUser(): User {
    var value = JSON.parse(this.get('user'));
    this.user = new User();
    this.user.FirstName = value.firstname;
    this.user.LastName = value.lastname;
    this.user.Role = value.role;
    this.user.Email = value.email;
    this.user.permissions = value.permissions;
    return this.user;
  }

  getFlag(langName: string) {
    if (langName === 'ar-EG') {
      return this.arabicFlag;
    } else if (langName === 'en-US') {
      return this.englishFlag;
    }
  }
}
