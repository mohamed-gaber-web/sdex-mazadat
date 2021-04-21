import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { CountdownModule } from 'ngx-countdown';
import { FeaturedBiddingsResolver } from './featuredBiddings.resolver';
import { HomeSlidesResolver } from './home-slides.resolver';
import { HomeCategoriesResolver } from './home-categories.resolver';

export const routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      biddings: FeaturedBiddingsResolver,
      slides: HomeSlidesResolver,
      categories: HomeCategoriesResolver
    },
  },
];

@NgModule({
  imports: [
    CountdownModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [HomeComponent],
  providers: [FeaturedBiddingsResolver, HomeSlidesResolver, HomeCategoriesResolver],
})
export class HomeModule {}
