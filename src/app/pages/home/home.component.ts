import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import {
  biddingCategoryApi,
  biddingsListFeaturedApi,
  homeSliderApi,
} from 'src/app/shared/constants/api.constants';
import { map, tap } from 'rxjs/operators';
import { BiddingsService } from 'src/app/shared/services/biddings.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/shared/services/ui.service';
import * as signalR from '@aspnet/signalr';
import { signalRApi } from 'src/app/shared/constants/api.constants';
import { ICategory } from 'src/app/shared/models/ICategory.model';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { SnackbarPosition } from 'src/app/shared/enums/snackbar-position.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  featureMzadat$: Observable<IBidding[]>;
  categories$: Observable<ICategory[]>;
  slides$: Observable<any[]>;
  subs: Subscription[] = [];
  hubConnection: signalR.HubConnection;

  constructor(
    private data: DataService,
    private biddingsService: BiddingsService,
    private translate: TranslateService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private helpers: HelpersService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // Getting Route Data
    this.categories$ = this.route.data.pipe(map((res) => res.categories));
    this.slides$ = this.route.data.pipe(map((res) => res.slides));
    this.featureMzadat$ = this.route.data.pipe(map((res) => res.biddings));

    // Signal R Connection and listening for changes
    this.startConnection();
    this.hubConnection.on('biddingChangedEvent', (id) => {
      this.getFeaturedBiddings();
    });

    this.hubConnection.onreconnected(() => {
      this.getFeaturedBiddings();
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

    this.subs.push(
      this.biddingsService.biddingsChanged.subscribe((res) => {
        if (res) {
          this.getFeaturedBiddings();
        }
      })
    );

    this.subs.push(
      this.translate.onLangChange
        .pipe(
          tap((res: any) => {
            const flag = this.storageService.getFlag(res.lang);
            this.storageService.setLanguage(flag);
            this.getFeaturedBiddings();
            this.getCategories();
            this.getHomeSlides();
          })
        )
        .subscribe()
    );
  }

  getFeaturedBiddings() {
    this.uiService.showLoadingBar();
    this.featureMzadat$ = this.data.getList(biddingsListFeaturedApi).pipe(
      tap((res) => {
        this.biddingsService.biddingsChanged.next(false);
        this.uiService.hideLoadingBar();
      }),
      map((items) => items)
    );
  }

  getCategories() {
    this.categories$ = this.data
      .getList(biddingCategoryApi)
      .pipe(map((items) => items));
  }

  getHomeSlides() {
    this.slides$ = this.data.get(homeSliderApi).pipe(
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

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(signalRApi)
      .withAutomaticReconnect()
      .build();
    this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
