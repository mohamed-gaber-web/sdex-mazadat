import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutResolver } from './about.resolver';


export const routes = [
  {
    path: 'about',
    component: AboutComponent,
    resolve: {
      about: AboutResolver
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [AboutComponent],
  providers: [AboutResolver]
})
export class AboutModule {}
