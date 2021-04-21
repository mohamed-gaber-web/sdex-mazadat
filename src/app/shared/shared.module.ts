import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true,
};
import { PipesModule } from '../theme/pipes/pipes.module';
import { RatingComponent } from './components/rating/rating.component';
import { ControlsComponent } from './components/controls/controls.component';
import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { DetailsCarouselComponent } from './components/details-carsouel/details-carousel.component';
import { BrandsCarouselComponent } from './components/brands-carousel/brands-carousel.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { ProductDialogComponent } from './components/products-carousel/product-dialog/product-dialog.component';
import { BannersComponent } from './components/banners/banners.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BiddingsListComponent } from './components/biddings/biddings-list/biddings-list.component';
import { BiddingItemComponent } from './components/biddings/bidding-item/bidding-item.component';
import { CountdownModule } from 'ngx-countdown';
import { DataService } from './services/data.service';
import { BiddingsService } from './services/biddings.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { UiService } from './services/ui.service';
import { SafePipe } from './pipes/safe.pipe';
import { HelpersService } from './services/helpers.service';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BiddingLogModalComponent } from './components/biddings/bidding-log-modal/bidding-log-modal.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SearchComponent } from './components/search/search.component';
import { TermsModalComponent } from './modals/terms-modal/terms-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    CountdownModule,
    TranslateModule,
    NgxPaginationModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    DetailsCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    BiddingsListComponent,
    BiddingItemComponent,
    CountdownModule,
    NgxPaginationModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    SafePipe,
    FormsModule,
    CategoriesListComponent,
    ReactiveFormsModule,
    SearchComponent,
  ],
  declarations: [
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    DetailsCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    BiddingsListComponent,
    BiddingItemComponent,
    SafePipe,
    CategoriesListComponent,
    BiddingLogModalComponent,
    SearchComponent,
    TermsModalComponent,
  ],
  entryComponents: [
    ProductDialogComponent,
    BiddingLogModalComponent,
    TermsModalComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DataService,
    BiddingsService,
    UiService,
    HelpersService,
  ],
})
export class SharedModule {}
