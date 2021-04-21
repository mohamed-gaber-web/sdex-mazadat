import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ContactComponent } from './contact.component';
import { ContactResolver } from './contact.resolver';

export const routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: {
      contactInfo: ContactResolver,
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
  declarations: [ContactComponent],
  providers: [ContactResolver]
})
export class ContactModule {}
