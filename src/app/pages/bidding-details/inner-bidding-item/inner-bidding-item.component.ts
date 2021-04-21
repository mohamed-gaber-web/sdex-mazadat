import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { biddingBiddApi } from 'src/app/shared/constants/api.constants';
import { SnackbarMessage } from 'src/app/shared/enums/snackbar-message.enum';
import { SnackbarPosition } from 'src/app/shared/enums/snackbar-position.enum';
import { IBidding } from 'src/app/shared/models/IBidding.model';
import { IBiddingItem } from 'src/app/shared/models/IBiddingItem.model';
import { DataService } from 'src/app/shared/services/data.service';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { MapModalComponent } from '../map-modal/map-modal.component';

@Component({
  selector: 'app-inner-bidding-item',
  templateUrl: './inner-bidding-item.component.html',
  styleUrls: ['./inner-bidding-item.component.scss'],
})
export class InnerBiddingItemComponent implements OnInit, OnChanges {
  @Input() mainBiddingItem: IBidding;
  @Input() biddingItem: IBiddingItem;
  @Input() index: number;
  subs: Subscription[] = [];
  biddingAmount: number;
  biddingInProgress: boolean;
  constructor(
    public helpers: HelpersService,
    private uiService: UiService,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.setBiddingAmount(changes.biddingItem.currentValue);
  }

  ngOnInit(): void {
    this.setBiddingAmount(this.biddingItem);
  }

  setBiddingAmount(item: IBiddingItem) {
    if(item.highestBiddingPrice === 0) {
      this.biddingAmount = item.startPricie + item.minimumPrice
    } else {
      this.biddingAmount = item.highestBiddingPrice + item.minimumPrice;
    }
  }

  bid() {
    this.biddingInProgress = true;
    this.uiService.showLoadingBar();
    const body = {
      biddingId: this.mainBiddingItem.id,
      itemId: this.biddingItem.id,
      amount: this.biddingAmount,
    };
    this.subs.push(
      this.data.post(biddingBiddApi, body).subscribe(
        (res) => {
          // this.uiService.showMessage(
          //   'biddDoneSuccessfully',
          //   SnackbarMessage.succes,
          //   '',
          //   true,
          //   SnackbarPosition.top
          // );
          this.uiService.hideLoadingBar();
          this.biddingInProgress = false;
        },
        (err) => {
          this.uiService.hideLoadingBar();
          this.biddingInProgress = false;
          this.uiService.showMessage(
            err.error[0],
            '',
            '',
            null,
            false,
            SnackbarPosition.bottom
          );
        }
      )
    );
  }

  get biddingEnded() {
    return new Date() > new Date(this.mainBiddingItem.endDate);
  }

  get biddingNotStarted() {
    if(this.mainBiddingItem.status === 'To be Started') {
      return true;
    }
  }

  increaseBidding() {
    this.biddingAmount = this.biddingAmount += this.biddingItem.minimumPrice;
  }

  decreaseBidding() {
    const total =
      this.biddingItem.highestBiddingPrice + this.biddingItem.minimumPrice;
    if (this.biddingAmount > total) {
      this.biddingAmount = this.biddingAmount -= this.biddingItem.minimumPrice;
    } else {
      return;
    }
  }

  showMap(item: IBiddingItem) {
    const data = {
      lat: item.lat,
      long: item.long,
      title: item.biddingItemTranslations[0].title
    };
    this.dialog.open(MapModalComponent, {
      panelClass: 'large-modal',
      data,
    });
  }
}
