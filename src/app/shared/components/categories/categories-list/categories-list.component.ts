import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ICategory } from 'src/app/shared/models/ICategory.model';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent implements OnInit, OnChanges {
  categoriesList: ICategory[];
  @Input() categories: ICategory[];
  constructor(public helpers: HelpersService) {}

  ngOnInit(): void {
    this.categoriesList = this.categories;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categoriesList =
      changes.categories.currentValue || changes.categories.previousValue;
  }
}
