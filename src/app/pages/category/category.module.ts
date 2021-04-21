import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './category.component';
import { CategoryResolver } from './category.resolver';

export const routes = [
  {
    path: '',
    component: CategoryComponent,
    resolve: {
      category: CategoryResolver
    }
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [CategoryComponent],
  providers: [CategoryResolver]
})
export class CategoryModule {}
