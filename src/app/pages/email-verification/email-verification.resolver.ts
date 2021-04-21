import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { emailVerificationApi } from 'src/app/shared/constants/api.constants';

@Injectable()
export class EmailVerificationResolver implements Resolve<any> {
  constructor(private data: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const params = {
      token: route.queryParamMap.get('confirmationtoken'),
      id: +route.queryParamMap.get('userId'),
    };
    return this.data.post(`${emailVerificationApi}`, params).pipe(
      map((res) => {
        if (res) {
          return true;
        }
      })
    );
  }
}
