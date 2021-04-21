import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-file-modal',
  templateUrl: './view-file-modal.component.html',
  styleUrls: ['./view-file-modal.component.scss'],
})
export class ViewFileModalComponent implements OnInit {
  srcUrl: string;
  constructor(
    public dialogRef: MatDialogRef<ViewFileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.srcUrl = 'data:application/pdf;base64,' + this.data;
  }
}
