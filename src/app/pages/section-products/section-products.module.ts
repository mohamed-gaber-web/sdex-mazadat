import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CountdownModule } from 'ngx-countdown';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


import { SectionProductsComponent } from './section-products.component';

export const routes = [
  { path: 'sectionProducts', component: SectionProductsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CountdownModule,
    NgxPaginationModule
  ],
    declarations: [
        SectionProductsComponent
  ]
})
export class SectionProducts { }