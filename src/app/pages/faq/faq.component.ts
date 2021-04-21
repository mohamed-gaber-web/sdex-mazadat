import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';

import { DataService } from 'src/app/shared/services/data.service';
import { Observable, Subscription } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage.service';

import { biddingFaqPage } from 'src/app/shared/constants/api.constants';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  faqItems$: Observable<any>;
  subs: Subscription[] = [];

  constructor(
    private data: DataService,
    private translate: TranslateService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.faqItems$ = this.route.data.pipe(map(res => res.faq));

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
    this.uiService.showLoadingBar();
    this.faqItems$ = this.data.getList(biddingFaqPage).pipe(
      tap(() => {
        this.uiService.hideLoadingBar();
      }),
      map((items) => items)
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
