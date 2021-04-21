import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { biddingsFilteredApi } from 'src/app/shared/constants/api.constants';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { trackById } from 'src/app/shared/utils/track-by';
import * as signalR from '@aspnet/signalr';
import { signalRApi } from 'src/app/shared/constants/api.constants';
import { biddingsLimit } from 'src/app/shared/constants/general.constants';
import { SnackbarPosition } from 'src/app/shared/enums/snackbar-position.enum';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  biddings: IBidding[];
  pageInfo: any;
  currentPageNo: number;
  subs: Subscription[] = [];
  categoryId: string;
  hubConnection: signalR.HubConnection;

  trackById = trackById;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private uiService: UiService,
    private storageService: StorageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.startConnection();
    this.hubConnection.on('biddingChangedEvent', (id) => {
      this.getData(this.currentPageNo);
    });
    this.hubConnection.onclose(() => {
      this.subs.push(
        this.uiService
          .showMessage(
            'biddingNotGettingUpdated',
            '',
            'refresh',
            'infinite',
            true,
            SnackbarPosition.bottom
          )
          .onAction()
          .subscribe(() => location.reload())
      );
    });
    this.hubConnection.onreconnected(() => {
      this.getData(this.currentPageNo);
    });

    this.subs.push(
      this.route.data.subscribe((res) => {
        this.categoryId = res.data.id;
        this.biddings = res.data.result;
        this.fillPageInfo(res.data);
      })
    );
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

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(signalRApi)
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  getData(pageNo: number) {
    this.uiService.showLoadingBar();
    this.subs.push(
      this.data
        .getList(biddingsFilteredApi, {
          params: {
            CategoryId: this.categoryId,
            Offset: pageNo - 1,
            Limit: biddingsLimit,
          },
        })
        .pipe(
          tap((res: any) => {
            this.fillPageInfo(res);
          })
        )
        .subscribe((res: any) => {
          this.biddings = res.result;
          this.uiService.hideLoadingBar();
        })
    );
  }

  pageChanged(event) {
    this.currentPageNo = event;
    this.getData(event);
  }

  fillPageInfo(res) {
    this.currentPageNo = res.offset + 1;
    this.pageInfo = {
      total: res.length,
      limit: res.limit,
      pageNo: res.offset,
    };
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
