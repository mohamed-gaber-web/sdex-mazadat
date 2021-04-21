import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { systemInfoApi } from 'src/app/shared/constants/api.constants';
import { map } from 'rxjs/operators';

@Injectable()
export class AboutResolver implements Resolve<string> {
  constructor(private data: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this.data
      .get(systemInfoApi)
      .pipe(
        map((res: any) => res.systemInformationTranslationDtos.find(x => x.fieldName === 'About us').fieldValue)
      );
  }
}
