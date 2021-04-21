import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import {
  homeSliderApi,
} from 'src/app/shared/constants/api.constants';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeSlidesResolver implements Resolve<any[]> {
  constructor(private data: DataService, private helpers: HelpersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    return this.data.get(homeSliderApi).pipe(
      map((res: any) => {
        const array = [];
        res.forEach((item) => {
          array.push({
            image: this.helpers.correctImageUrl(item.imageUrl),
            link: item.link,
            title: item.sliderTranslationDtos[0]?.title,
            subtitle: item.sliderTranslationDtos[0]?.subTitle,
          });
        });
        return array;
      })
    );
  }
}
