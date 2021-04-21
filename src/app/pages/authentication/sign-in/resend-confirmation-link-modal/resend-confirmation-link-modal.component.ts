import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { resendConfirmationLinkApi } from 'src/app/shared/constants/api.constants';
import { callbackUrl } from 'src/app/shared/constants/general.constants';
import { SnackbarMessage } from 'src/app/shared/enums/snackbar-message.enum';
import { SnackbarPosition } from 'src/app/shared/enums/snackbar-position.enum';
import { DataService } from 'src/app/shared/services/data.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-resend-confirmation-link-modal',
  templateUrl: './resend-confirmation-link-modal.component.html',
  styleUrls: ['./resend-confirmation-link-modal.component.scss'],
})
export class ResendConfirmationLinkModalComponent implements OnInit, OnDestroy {
  email: string;
  subs: Subscription[] = [];
  constructor(
    public dialogRef: MatDialogRef<ResendConfirmationLinkModalComponent>,
    private data: DataService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {}

  submit() {
    this.uiService.showSpinner();
    const body = {
      callbackUrl,
      email: this.email
    }
    this.subs.push(
      this.data.post(resendConfirmationLinkApi, body).subscribe((res) => {
        this.uiService.hideSpinner();
        this.uiService.showMessage(
          'confirmationLinkSendSuccessfully',
          SnackbarMessage.succes,
          '',
          '',
          true,
          SnackbarPosition.bottom
        );
        this.dialogRef.close();
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
