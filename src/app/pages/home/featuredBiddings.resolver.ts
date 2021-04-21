import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import { biddingsListFeaturedApi } from 'src/app/shared/constants/api.constants';
import { first, filter } from 'rxjs/operators';

@Injectable()
export class FeaturedBiddingsResolver implements Resolve<IBidding[]> {
  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBidding[]> {
      return this.dataService.getList(biddingsListFeaturedApi);
  }
}
