import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { biddingItemApi } from 'src/app/shared/constants/api.constants';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable()
export class BiddingDetailsResolver implements Resolve<IBidding> {
  constructor(private data: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBidding> {
    return this.data
      .getItemById(biddingItemApi, +route.paramMap.get('id'))
      .pipe(map((item) => item));
  }
}
