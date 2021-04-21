import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  biddingsPayByCreditCardApi,
  biddingsPayByUploadingImageApi,
} from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { PaymentIframeModalComponent } from '../payment-iframe-modal/payment-iframe-modal.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent implements OnInit {
  @Input() biddingId: number;
  @Input() type: string;
  @Output() paymentDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('inputFile') inputFile: ElementRef;
  subs: Subscription[] = [];
  constructor(
    private uiService: UiService,
    private helpers: HelpersService,
    private data: DataService,
    private changeDetection: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog(paymentKey: string): void {
    const dialogRef = this.dialog.open(PaymentIframeModalComponent, {
      data: paymentKey,
      panelClass: 'large-modal',
    });
  }

  payByCreditCard() {
    this.uiService.showSpinner();
    const body = {
      biddingId: this.biddingId,
      paymentFor: this.type === 'termsPaper' ? 0 : 1,
    };
    this.subs.push(
      this.data.post(biddingsPayByCreditCardApi, body).subscribe(
        (res: any) => {
          this.openDialog(res.paymentKey);
          this.uiService.hideSpinner();
        },
        (err) => this.uiService.hideSpinner()
      )
    );
  }

  async payByUploadingImage(file: File) {
    this.uiService.showSpinner();
    const imgString: any = await this.helpers.toBase64(file);
    const body = {
      biddingId: this.biddingId,
      paymentFor: this.type === 'termsPaper' ? 0 : 1,
      cheque: {
        fieldName: 'chequeUploader',
        filename: file.name,
        fileExtension: this.helpers.getExtension(file.name),
        fileData: this.helpers.validBase64(imgString),
      },
    };
    this.subs.push(
      this.data.post(biddingsPayByUploadingImageApi, body).subscribe(
        (res: any) => {
          this.uiService.hideSpinner();
          this.inputFile.nativeElement.value = '';
          this.uiService.showMessage(
            'documentSentForReview',
            '',
            '',
            null,
            true
          );
          this.paymentDone.next(true);
        },
        (err) => this.uiService.hideSpinner()
      )
    );
  }
}
