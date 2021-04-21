import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { subscribedBiddingsApi } from 'src/app/shared/constants/api.constants';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { DataService } from 'src/app/shared/services/data.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-subscribed-biddings',
  templateUrl: './subscribed-biddings.component.html',
  styleUrls: ['./subscribed-biddings.component.scss'],
})
export class SubscribedBiddingsComponent implements OnInit, OnDestroy {
  subscribedBiddings$: Observable<IBidding[]>;
  subs: Subscription[] = [];
  constructor(
    private data: DataService,
    private uiService: UiService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subscribedBiddings$ = this.route.data.pipe(map((res) => res.biddings));
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
    this.subscribedBiddings$ = this.data.getList(subscribedBiddingsApi).pipe(
      tap((res) => {
        this.uiService.hideLoadingBar();
      }),
      map((res) => {
        const array = [];
        res.forEach((item) => {
          array.push(item.bidding);
        });
        return array;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
