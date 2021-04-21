import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import {
  biddingCategoryApi,
} from 'src/app/shared/constants/api.constants';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/models/ICategory.model';

@Injectable()
export class HomeCategoriesResolver implements Resolve<ICategory[]> {
  constructor(private data: DataService, private helpers: HelpersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICategory[]> {
    return this.data.getList(biddingCategoryApi).pipe(
      map((items) => items as ICategory[])
    );
  }
}
