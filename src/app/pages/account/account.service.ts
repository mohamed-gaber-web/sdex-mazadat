import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from 'src/app/shared/models/User';
import UpdatePassword from 'src/app/shared/models/UpdatePassword';
import Shipping from 'src/app/shared/models/Shipping';
import UpdateBasicUserInfo from 'src/app/shared/models/UpdateUserBasicInfo';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient,

    ) {
    }
    /**
     * Update Customer Password
     */
    updatePassword(credentials: UpdatePassword) {
        return this.http.put(`api/users/password`, credentials);
    }
    /**
     * Update Shipping Address
     */
    updateShipping(shippingAddress: Shipping) {
        var shipping : ShippingData;
        shipping = new ShippingData();
        shipping.shipping = shippingAddress;
        return this.http.put(`api/users`,shipping );
    }

    updateUserBasicInfo(updateUser: UpdateBasicUserInfo) {
       
        return this.http.put(`api/users`,updateUser );
    }
    /**
     * Get Account Information
     */
    getAccount(){
        return this.http.get(`api/users/info`);
    }
 
}
export default class ShippingData {
    shipping: Shipping;
}