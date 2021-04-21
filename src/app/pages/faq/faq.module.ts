import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FaqComponent } from './faq.component';
import { FaqResolver } from './faq.resolver';

export const routes = [
  {
    path: '',
    component: FaqComponent,
    resolve: {
      faq: FaqResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [FaqComponent],
  providers: [FaqResolver],
})
export class FaqModule {}
