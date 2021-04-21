import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bidding-log-modal',
  templateUrl: './bidding-log-modal.component.html',
  styleUrls: ['./bidding-log-modal.component.scss'],
})
export class BiddingLogModalComponent implements OnInit {
  displayedColumns: string[] = ['position', 'amount', 'date'];
  constructor(
    public dialogRef: MatDialogRef<BiddingLogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
