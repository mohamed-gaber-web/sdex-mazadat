import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CategoryDetailsComponent } from './category-details.component';
import { CategoryBiddingsResolver } from './category-biddings.reolver';

export const routes = [
  {
    path: ':id',
    component: CategoryDetailsComponent,
    resolve: {
      data: CategoryBiddingsResolver,
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [CategoryDetailsComponent],
  providers: [CategoryBiddingsResolver],
})
export class CategoryDetailsModule {}
