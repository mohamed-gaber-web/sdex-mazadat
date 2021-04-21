import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  biddingCategoryApi,
} from '../../constants/api.constants';
import { ICategory } from '../../models/ICategory.model';
import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  CategoryId: number;
  SearchText: string;
  categories$: Observable<ICategory[]>;
  subs: Subscription[] = [];
  constructor(
    private data: DataService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.route.queryParams.subscribe(res => {
        if(res.CategoryId) {
          this.CategoryId = res.CategoryId;
        }
        if(res.SearchText) {
          this.SearchText = res.SearchText;
        }
      })
    )
    this.getData();
    this.subs.push(
      this.translate.onLangChange
        .pipe(
          tap((res: any) => {
            const flag = this.storageService.getFlag(res.lang);
            this.storageService.setLanguage(flag);
            this.getData();
          })
        )
        .subscribe()
    );
  }

  getData() {
    this.categories$ = this.data.getList(biddingCategoryApi).pipe(
      map((items) => {
        return items;
      })
    );
  }

  search(formValue) {
    const {SearchText, CategoryId} = formValue;
    const searchData: any = {}
    if(SearchText) {
      searchData.SearchText = SearchText;
    }
    if(CategoryId) {
      searchData.CategoryId = CategoryId;
    }
    this.router.navigate(['/search-results'], {
      queryParams: searchData
    })
  }
}
