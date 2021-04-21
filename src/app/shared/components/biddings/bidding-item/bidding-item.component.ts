import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IBidding } from '../../../models/IBidding.model';
import { CountdownEvent, CountdownConfig } from 'ngx-countdown';
import { BiddingsService } from '../../../services/biddings.service';
import { fadeInUp400ms } from '../../../utils/fade-in-up.animation';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { BiddingLogModalComponent } from '../bidding-log-modal/bidding-log-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { biddingsListApi } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-bidding-item',
  templateUrl: './bidding-item.component.html',
  styleUrls: ['./bidding-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class BiddingItemComponent implements OnInit, OnDestroy {
  @Input() item: IBidding;
  @Input() showHistory: boolean;
  subs: Subscription[] = [];
  countConfig: CountdownConfig;
  constructor(
    public biddingsService: BiddingsService,
    public helpers: HelpersService,
    private dialog: MatDialog,
    private data: DataService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.countConfig = {
      leftTime: Math.round(+this.item.remainingSeconds),
    };
    if (+this.item.remainingSeconds > 86400) {
      this.countConfig.format = 'dd:hh:mm:ss';
    }
  }

  handleEvent(event: CountdownEvent) {
    if (event.action === 'done') {
      this.biddingsService.biddingsChanged.next(true);
    }
  }

  showBiddings(id: number) {
    this.uiService.showSpinner();
    this.subs.push(
      this.data
        .get(`${biddingsListApi}/${id}/user/history`)
        .subscribe((res) => {
          this.uiService.hideSpinner();
          this.dialog.open(BiddingLogModalComponent, {
            panelClass: 'small-modal',
            data: res,
          });
        })
    );
  }

  get isRemainingDays() {
    return +this.item.remainingSeconds > 86400;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
