import { Component, OnInit } from '@angular/core';
import { BiddingsService } from 'src/app/shared/services/biddings.service';
import { biddingCategoryApi } from 'src/app/shared/constants/api.constants';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage.service';

import { DataService } from 'src/app/shared/services/data.service';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { fadeInUp400ms } from 'src/app/shared/utils/fade-in-up.animation';
import { UiService } from 'src/app/shared/services/ui.service';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [fadeInUp400ms],
})
export class CategoryComponent implements OnInit {
  categories$: Observable<any>;
  subs: Subscription[] = [];

  constructor(
    private data: DataService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private biddingsService: BiddingsService,
    public helpers: HelpersService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.categories$ = this.route.data.pipe(map((res) => res.category));

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
    this.categories$ = this.data.getList(biddingCategoryApi).pipe(
      tap(() => {
        this.biddingsService.biddingsChanged.next(false);
        this.uiService.hideLoadingBar();
      }),
      map((items) => items)
    );
  }
}
