import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { biddingsFilteredApi } from 'src/app/shared/constants/api.constants';
import { biddingsLimit } from 'src/app/shared/constants/general.constants';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { trackById } from 'src/app/shared/utils/track-by';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchData: any;
  subs: Subscription[] = [];
  biddings: IBidding[];
  pageInfo: any;
  currentPageNo: number;
  trackById = trackById;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private uiService: UiService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.subs.push(
      this.route.data.subscribe((res) => {
        this.biddings = res.data.result;
        this.fillPageInfo(res.data);
      })
    );

    this.route.queryParams.subscribe((res: any) => {
      const searchData: any = {};
      if (res.CategoryId) {
        searchData.CategoryId = res.CategoryId;
      }
      if (res.SearchText) {
        searchData.SearchText = res.SearchText;
      }
      this.searchData = searchData;
      this.getData(1)
    });

    this.subs.push(
      this.translate.onLangChange
        .pipe(
          tap((res: any) => {
            const flag = this.storageService.getFlag(res.lang);
            this.storageService.setLanguage(flag);
            if (this.currentPageNo) {
              this.getData(this.currentPageNo);
            } else {
              this.getData(1);
            }
          })
        )
        .subscribe()
    );
  }

  pageChanged(event) {
    this.currentPageNo = event;
    this.getData(event);
  }

  getData(pageNo: number) {
    this.uiService.showLoadingBar();
    this.data
      .get(biddingsFilteredApi, {
        params: {
          ...this.searchData,
          limit: biddingsLimit,
          offset: pageNo - 1,
        },
      })
      .subscribe((res: any) => {
        this.biddings = res.result;
        this.fillPageInfo(res);
        this.uiService.hideLoadingBar();
      });
  }

  fillPageInfo(res) {
    this.currentPageNo = res.offset + 1;
    this.pageInfo = {
      total: res.length,
      limit: res.limit,
      pageNo: res.offset,
    };
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
