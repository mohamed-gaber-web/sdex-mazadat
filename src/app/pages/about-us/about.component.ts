import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { systemInfoApi } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  about$: Observable<string>;
  subs: Subscription[] = [];
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private storageService: StorageService
  ) {}
  ngOnInit() {
    this.about$ = this.route.data.pipe(map((res) => res.about));
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
    this.about$ = this.data
      .get(systemInfoApi)
      .pipe(
        map(
          (res: any) =>
            res.systemInformationTranslationDtos.find(
              (x) => x.fieldName === 'About us'
            ).fieldValue
        )
      );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
