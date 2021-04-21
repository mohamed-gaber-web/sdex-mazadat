import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { systemInfoApi } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit, OnDestroy {
  termsInfo$: Observable<any>;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private translate: TranslateService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.termsInfo$ = this.route.data.pipe(map((res) => res.termsInfo));
    this.subs.push(
      this.translate.onLangChange
        .pipe(
          tap((res: any) => {
            const flag = this.storageService.getFlag(res.lang);
            this.storageService.setLanguage(flag);
            this.getData();
          })
        )
        .subscribe()
    );
  }

  getData() {
    this.termsInfo$ = this.data
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

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
