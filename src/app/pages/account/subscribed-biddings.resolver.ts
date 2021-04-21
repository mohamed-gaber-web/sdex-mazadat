import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { subscribedBiddingsApi } from 'src/app/shared/constants/api.constants';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable()
export class SubscribedBiddingsResolver implements Resolve<IBidding[]> {
  constructor(private data: DataService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBidding[]> {
    return this.data.getList(subscribedBiddingsApi).pipe(
      map((res) => {
        const array = [];
        res.forEach((item) => {
          array.push(item.bidding);
        });
        return array;
      })
    );
  }
}
