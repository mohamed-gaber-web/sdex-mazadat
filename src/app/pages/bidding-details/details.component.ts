import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { BiddingsService } from 'src/app/shared/services/biddings.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DataService } from 'src/app/shared/services/data.service';
import {
  biddingItemApi,
  biddingsFilesApi,
  biddingSubscribeApi,
  signalRApi,
} from 'src/app/shared/constants/api.constants';
import { UiService } from 'src/app/shared/services/ui.service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { trackById } from 'src/app/shared/utils/track-by';
import * as signalR from '@aspnet/signalr';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { ViewFileModalComponent } from './view-file-modal/view-file-modal.component';
import { SnackbarPosition } from 'src/app/shared/enums/snackbar-position.enum';

@Component({
  selector: 'app-details-mazad',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsMazadComponent implements OnInit, OnDestroy {
  bidding$: Observable<IBidding>;
  biddingItem: IBidding;
  subs: Subscription[] = [];
  countConfig: CountdownConfig;
  trackById = trackById;
  private hubConnection: signalR.HubConnection;

  constructor(
    private route: ActivatedRoute,
    public biddingsService: BiddingsService,
    private translate: TranslateService,
    private data: DataService,
    private uiService: UiService,
    private storageService: StorageService,
    public authService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router,
    public helpers: HelpersService
  ) {}

  ngOnInit() {
    this.subs.push(
      this.route.data
        .pipe(
          map((data) => data.bidding),
          tap((item) => this.setBiddingItem(item))
        )
        .subscribe()
    );
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
    this.startConnection();
    this.hubConnection.on('biddingChangedEvent', () => {
      this.uiService.showMessage(
        'biddingDataUpdated',
        '',
        '',
        null,
        true,
        SnackbarPosition.bottom
      );
      this.getData();
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
      this.getData();
    });
  }

  stop() {
    this.hubConnection.stop();
  }

  setBiddingItem(item: IBidding) {
    this.biddingItem = item;
    console.log(item);
    this.countConfig = {
      leftTime: Math.round(+item.remainingSeconds),
    };
    if (+item.remainingSeconds > 86400) {
      this.countConfig.format = 'dd:hh:mm:ss';
    }
  }

  getData() {
    this.subs.push(
      this.data
        .getItemById(biddingItemApi, this.biddingItem.id)
        .pipe(
          map((item) => item),
          tap((item) => {
            this.setBiddingItem(item);
          })
        )
        .subscribe()
    );
  }

  get paymentEnded() {
    return new Date(this.biddingItem.paymentEndDate) < new Date();
  }

  get biddingEnded() {
    return new Date() > new Date(this.biddingItem.endDate);
  }

  viewFile(type: string): void {
    this.uiService.showSpinner();
    this.subs.push(
      this.data
        .get(biddingsFilesApi, {
          params: {
            BiddingId: this.biddingItem.id,
            Field: type === 'termsPaper' ? 0 : 1,
          },
        })
        .subscribe((res: any) => {
          this.uiService.hideSpinner();
          this.dialog.open(ViewFileModalComponent, {
            panelClass: 'large-modal',
            data: res.fileData,
          });
        })
    );
  }

  get isRemainingDays() {
    return +this.biddingItem.remainingSeconds > 86400;
  }

  subscribe() {
    const body = {
      biddingId: this.biddingItem.id,
    };
    if (this.authService.IsLoggedIn) {
      this.uiService.showLoadingBar();
      this.subs.push(
        this.data.post(biddingSubscribeApi, body).subscribe(
          (res) => {
            this.getData();
            this.uiService.hideLoadingBar();
          },
          (err) => this.uiService.hideLoadingBar()
        )
      );
    } else {
      this.router.navigate(['/user/sign-in'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
    }
  }

  handleEvent(event: CountdownEvent) {
    if (event.action === 'done' && this.biddingItem.status !== 'Completed') {
      this.getData();
    }
  }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(signalRApi)
      .withAutomaticReconnect([0, 1000])
      .build();

    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
