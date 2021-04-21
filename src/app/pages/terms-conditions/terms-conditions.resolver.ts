import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { systemInfoApi } from 'src/app/shared/constants/api.constants';
import { map } from 'rxjs/operators';

@Injectable()
export class TermsConditionsResolver implements Resolve<any> {
  constructor(private data: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.data
      .get(systemInfoApi)
      .pipe(
        map(
          (res: any) =>
            res.systemInformationTranslationDtos.find(
              (x) => x.fieldName === 'Terms&Conditions'
            ).fieldValue
        )
      );
  }
}
