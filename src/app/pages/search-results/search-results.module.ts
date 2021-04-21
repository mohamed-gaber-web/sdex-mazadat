import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsResolver } from './search-results.resolver';

export const routes = [
  { path: '', component: SearchResultsComponent, resolve: {
    data: SearchResultsResolver
  } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    SearchResultsComponent
  ],
  providers: [SearchResultsResolver]
})
export class SearchResultsModule { }
