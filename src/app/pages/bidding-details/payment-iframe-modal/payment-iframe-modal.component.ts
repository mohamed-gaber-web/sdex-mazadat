import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-iframe-modal',
  templateUrl: './payment-iframe-modal.component.html',
  styleUrls: ['./payment-iframe-modal.component.scss'],
})
export class PaymentIframeModalComponent implements OnInit {
  iframeSrc: string;
  constructor(
    public dialogRef: MatDialogRef<PaymentIframeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.iframeSrc = `https://accept.paymobsolutions.com/api/acceptance/iframes/32958?payment_token=${this.data}`;
  }
}
