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
import { biddingsFilteredApi } from 'src/app/shared/constants/api.constants';
import { map } from 'rxjs/operators';
import { biddingsLimit } from 'src/app/shared/constants/general.constants';

@Injectable()
export class SearchResultsResolver implements Resolve<IBidding[]> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBidding[]> {
    const CategoryId = route.queryParamMap.get('CategoryId');
    const SearchText = route.queryParamMap.get('SearchText');
    const searchData: any = {}
    if(CategoryId) {
        searchData.CategoryId = CategoryId;
    }
    if(SearchText) {
        searchData.SearchText = SearchText;
    }
    return this.dataService
      .getList(biddingsFilteredApi, {
        params: {
          ...searchData,
          Offset: 0,
          Limit: biddingsLimit,
        },
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
