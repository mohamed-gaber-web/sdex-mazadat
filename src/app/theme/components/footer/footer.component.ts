import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { systemInfoApi } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  contactInfo$: Observable<any>;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.contactInfo$ = this.data
      .get(systemInfoApi)
      .pipe(
        map((res: any) => res)
      );
  }

  subscribe() {}
}
