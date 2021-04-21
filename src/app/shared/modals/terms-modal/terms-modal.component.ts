import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { systemInfoApi } from '../../constants/api.constants';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss'],
})
export class TermsModalComponent implements OnInit {
  termsInfo$: Observable<string>;
  constructor(
    public dialogRef: MatDialogRef<TermsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.termsInfo$ = this.dataService
      .get(systemInfoApi)
      .pipe(
        map(
          (res: any) =>
            res.systemInformationTranslationDtos.find(
              (x) => x.fieldName === 'Agreement'
            ).fieldValue
        )
      );
  }
}
