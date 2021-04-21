import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { biddingsListFeaturedApi, biddingsFilteredApi } from 'src/app/shared/constants/api.constants';
import { switchMap, map } from 'rxjs/operators';
import { biddingsLimit } from 'src/app/shared/constants/general.constants';

@Injectable()
export class CategoryBiddingsResolver implements Resolve<IBidding[]> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBidding[]> {
    return this.dataService.getList(biddingsFilteredApi, {
      params: {
        CategoryId: route.paramMap.get('id'),
        Offset: 0,
        Limit: biddingsLimit,
      },
    }).pipe(
      map(res => {
        const data = {
          id: route.paramMap.get('id'),
          ...res
        }
        return data;
      })
    )
  }
}
